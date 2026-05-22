#!/usr/bin/env bash
# knitstudio deployment management script
# Usage: ./scripts/deploy.sh [command]

set -e

COMMAND="${1:-status}"

case "$COMMAND" in
  status)
    echo "🧶 knitstudio deployment status"
    echo "================================"
    docker compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
    echo ""
    echo "Services:"
    for svc in builder api mcp db redis; do
      if docker compose ps --format "{{.Name}}" 2>/dev/null | grep -q "$svc"; then
        echo "  ✅ $svc"
      else
        echo "  ❌ $svc"
      fi
    done
    echo ""
    echo "Nutritional info:"
    echo "  Builder:  http://localhost:3000"
    echo "  API:      http://localhost:3001"
    echo ""
    echo "Portainer:"
    echo "  knitstudio NO INSTALA Portainer."
    echo "  Si tienes Portainer, importa portainer-stack.yml desde Stacks → Add Stack"
    ;;

  start)
    echo "🧶 Starting knitstudio stack..."
    docker compose up -d
    echo "✅ Stack started"
    echo "   Builder: http://localhost:3000"
    echo "   API:     http://localhost:3001"
    echo "   MCP:     http://localhost:3100"
    ;;

  stop)
    echo "🛑 Stopping knitstudio stack..."
    docker compose down
    echo "✅ Stack stopped"
    ;;

  restart)
    echo "🔄 Restarting knitstudio stack..."
    docker compose down
    docker compose up -d
    echo "✅ Stack restarted"
    ;;

  logs)
    shift
    docker compose logs -f "$@"
    ;;

  update)
    echo "🧶 Updating knitstudio deployment..."
    git pull 2>/dev/null || echo "No git remote configured"
    docker compose build --parallel
    docker compose up -d --force-recreate
    echo "✅ Update complete"
    ;;

  portainer)
    echo "🔧 Para integrar knitstudio con Portainer:"
    echo ""
    echo "   1. Abre Portainer en http://localhost:9000"
    echo "   2. Ve a Stacks → + Add stack"
    echo "   3. Pega el contenido de portainer-stack.yml"
    echo "   4. Asigna nombre 'knitstudio' y haz Deploy"
    echo ""
    echo "   knitstudio NO instala Portainer. Usa el que ya tengas."
    ;;

  test)
    echo "🧪 Testing knitstudio endpoints..."
    echo -n "   Builder (3000): "
    curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000 || echo "FAIL"
    echo -n "   API (3001):     "
    curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3001/api/health || echo "FAIL"
    echo -n "   MCP (3100):     "
    curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3100 || echo "EXPECTED (WebSocket)"
    ;;

  *)
    echo "🧶 knitstudio deployment CLI"
    echo "Usage: ./scripts/deploy.sh [command]"
    echo ""
    echo "Commands:"
    echo "  status    → Show stack status (default)"
    echo "  start     → Start all services"
    echo "  stop      → Stop all services"
    echo "  restart   → Restart all services"
    echo "  logs      → View service logs"
    echo "  update    → Pull latest and rebuild"
    echo "  portainer → Instructions for Portainer integration"
    echo "  test      → Test all endpoints"
    ;;
esac
