# knitstudio — Mobile Support Plan

> Resumen del plan completo. Ver docs/mobile-export-pipeline.md y docs/catalogo-componentes-rn.md para detalle.

## 3 Estrategias Mobile

| Estrategia | Esfuerzo | Resultado | Timeline |
|------------|:--------:|-----------|:--------:|
| **Capacitor wrap** (WebView + plugins) | 3 semanas | App en App Store / Play Store sin reescribir nada | Semana 13-15 |
| **React Native export** (JSON → RN code) | 6 semanas | App nativa real con gestures, animaciones 60fps | Semana 16-21 |
| **Live edit RN** (WebSocket + fibers) | 12 semanas | Editar app RN en vivo desde knitstudio | Semana 18-24 |

## Capacitor Export Pipeline

```
knitstudio → exporta SPA web → Capacitor la envuelve en WebView nativa
  → plugins nativos: cámara, push, biometría, share, geolocalización
  → Fastlane: build + code signing + deploy to stores
  
Comando: knitstudio export --format=capacitor --out=./my-app
```

## React Native Export Pipeline

```
JSON universal → screens/ + components/ + navigation/ + services/ + theme/
  • Navigation Generator: JSON → Tab.Navigator + Stack.Screen
  • Action Flow Compiler: JSON → useCallback + useEffect hooks
  • StyleSheet Generator: CSS → RN StyleSheet objects
  • Component Mapper: web components → RN equivalents (View=div, Text=span, Image=img, etc)

Comando: knitstudio export --format=react-native --out=./my-rn-app
```

## React Native Components

| Categoría | Componentes |
|-----------|-------------|
| **RN puros** (13) | SafeAreaView, FlatList, SectionList, StatusBar, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight, Pressable RN, RefreshControl, ActivityIndicator, Modal RN, Switch RN |
| **Web→RN mapeados** (5) | Text, Image, TextInput, ScrollView, Button (cada uno con mapeo de props y estilos) |
| **Nativos específicos** (12) | NavigationContainer, StackNavigator, TabNavigator, DrawerNavigator, Swipeable, PinchGesture, PanResponder, Animated, Reanimated, MapView, WebView, Device APIs |

## Live Edit RN (Dev Mode)

```
knitstudio ↔ Bridge Server (WebSocket :9090) ↔ App RN (debug build)

Protocolo:
  SCREEN_UPDATE      → stream de pantalla del dispositivo
  COMPONENT_UPDATE   → cambiar props en vivo (modo A: fibra directa)
  STYLE_UPDATE       → cambiar estilos en vivo (modo A)
  ADD_COMPONENT      → insertar componente (modo B: Metro HMR)
  REMOVE_COMPONENT   → eliminar componente (modo B)
  NAVIGATE           → navegar a otra screen

Modo A (instantáneo): mutación directa en fibra React → solo preview
Modo B (200-500ms): escribir archivo → Metro HMR → persistente

Solo funciona en debug builds (requiere __REACT_DEVTOOLS_GLOBAL_HOOK__)
```

## Mobile Publishing (Fastlane)

```
knitstudio mobile:build --platform ios
knitstudio mobile:build --platform android
knitstudio mobile:publish --store testflight
knitstudio mobile:publish --store play --track internal

Fastlane lanes generados automáticamente:
  • beta (TestFlight / Internal Track)
  • release (App Store / Production)
  • screenshots (capturas automáticas)
```

## Template Projects Mobile

| Template | Target | Componentes incluidos |
|----------|--------|----------------------|
| `blank` | RN, Capacitor | Pantalla vacía + navegación |
| `tabs` | RN | TabNavigator + 3 screens |
| `auth-dashboard` | RN, Capacitor | Login + Dashboard + Profile |
| `camera-qr` | Capacitor, RN | Cámara + QR scanner + galería |
| `event-manager` | Capacitor | Lista + detalle + check-in + mapa |
| `chat` | RN | FlatList + input + WebSocket |
