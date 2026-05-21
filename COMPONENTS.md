# knitstudio — Component Catalog Summary

> 90+ componentes en 5 fases. Ver docs/component-catalog.md para versión completa.

## Fase 1 — Core (20 componentes, ~3 semanas)

| # | Componente | Target | Esfuerzo | Dependencias |
|---|-----------|--------|:--------:|-------------|
| 1 | Container/Layout | Web, RN | S | — |
| 2 | Text | Web, RN | S | — |
| 3 | Button | Web, RN | S | Text |
| 4 | Image | Web, RN | S | — |
| 5 | TextInput | Web, RN | M | Text |
| 6 | Form | Web, RN | M | TextInput, Button |
| 7 | Stack (VStack/HStack) | Web, RN | S | Container |
| 8 | ScrollView | Web, RN | S | Container |
| 9 | Card | Web, RN | S | Container, Text |
| 10 | Icon | Web, RN | S | — |
| 11 | Divider | Web, RN | S | — |
| 12 | Spacer | Web, RN | S | — |
| 13 | Navbar/Header | Web, RN | M | Button, Icon, Text |
| 14 | Footer | Web | M | Button, Icon |
| 15 | Sidebar | Web | M | Container, Icon, Text |
| 16 | SafeAreaView | RN | S | Container |
| 17 | StatusBar | RN | S | — |
| 18 | Pressable | Web, RN | S | — |
| 19 | Loading | Web, RN | S | — |
| 20 | Fragment | Web, RN | S | — |

## Fase 2 — Datos (15 componentes, ~4-5 semanas)

| # | Componente | Target | Esfuerzo |
|---|-----------|--------|:--------:|
| 1 | Table | Web | XL |
| 2 | DataList | RN, Web | M |
| 3 | FormField | Web, RN | M |
| 4 | Select/Dropdown | Web, RN | M |
| 5 | Checkbox | Web, RN | S |
| 6 | RadioGroup | Web, RN | S |
| 7 | Toggle/Switch | Web, RN | S |
| 8 | DatePicker | Web, RN | L |
| 9 | FileUpload | Web, RN | M |
| 10 | Chart | Web | L |
| 11 | Pagination | Web, RN | S |
| 12 | SearchBar | Web, RN | S |
| 13 | FilterBar | Web | M |
| 14 | EmptyState | Web, RN | S |
| 15 | DataExport | Web | M |

## Fase 3 — Avanzados (20 componentes, ~3-4 semanas)

| # | Componente | Target | Esfuerzo |
|---|-----------|--------|:--------:|
| 1 | Modal | Web, RN | M |
| 2 | Drawer | Web, RN | M |
| 3 | Toast/Notification | Web, RN | S |
| 4 | Alert/Banner | Web, RN | S |
| 5 | Tooltip | Web | S |
| 6 | Popover | Web | M |
| 7 | Tabs | Web, RN | M |
| 8 | Accordion | Web, RN | S |
| 9 | Stepper/Wizard | Web, RN | M |
| 10 | Timeline | Web, RN | S |
| 11 | Badge | Web, RN | S |
| 12 | Avatar | Web, RN | S |
| 13 | Chip/Tag | Web, RN | S |
| 14 | ProgressBar | Web, RN | S |
| 15 | Carousel | Web, RN | M |
| 16 | BottomSheet | RN, Web | M |
| 17 | ContextMenu | Web | M |
| 18 | TreeView | Web | M |
| 19 | DragDrop | Web, RN | L |
| 20 | VirtualList | Web, RN | L |

## Fase 4 — Plataforma (35 componentes, ~3-4 semanas)

### Web-specific (14)
Div, Section, Article, HeaderHTML, FooterHTML, Nav, Iframe, Video, Audio, Canvas, SVG, RichTextEditor, Maps, HTMLRaw

### React Native-specific (13)
SafeAreaView (nativo), FlatList, SectionList, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight, Animated, GestureHandler, RecyclerView, NavigationContainer, TabNavigator, StackNavigator, StatusBarRN

### Bridge (ambos) (8)
Button, Text, TextInput, Image, ScrollView, Modal, Loading, Switch

## Fase 5 — Ecosistema (20 componentes, ~7-9 semanas)

| # | Componente | Proyecto origen | Esfuerzo |
|---|-----------|:--------------:|:--------:|
| 1 | GuestCard | Check | M |
| 2 | GuestTable | Check | XL |
| 3 | QRCode | Check | M |
| 4 | EventCard | Check | S |
| 5 | EventCalendar | Check | L |
| 6 | CheckInScanner | Check | M |
| 7 | SeatMap | Check 3D | XL |
| 8 | SurveyBuilder | Check | XL |
| 9 | WheelOfLuck | Check | M |
| 10 | AgendaTimeline | Check | M |
| 11 | BadgeDesigner | Check | L |
| 12 | StatsWidget | Check | M |
| 13 | PipelineKanban | Check | L |
| 14 | AutomationRule | Check | L |
| 15 | EmailComposer | Check | L |
| 16 | PaymentForm | Check | XL |
| 17 | ChatBubble | Check | M |
| 18 | VenueSelector | Check 3D | M |
| 19 | TimelineFeed | Check | S |
| 20 | NavigationRail | Check | M |

## Esfuerzo Total Estimado

| Fase | Componentes | Días-hombre |
|------|:-----------:|:-----------:|
| F1 Core | 20 | ~20-25 |
| F2 Datos | 15 | ~30-40 |
| F3 Avanzados | 20 | ~25-35 |
| F4 Plataforma | ~35 | ~25-30 |
| F5 Ecosistema | 20 | ~50-70 |
| **Total** | **~110** | **~150-200** |
