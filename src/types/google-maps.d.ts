
declare interface Window {
  google: typeof google;
}

declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral, padding?: number | Padding): void;
    getCenter(): LatLng;
    getZoom(): number;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    setMap(map: Map | null): void;
    setPosition(latLng: LatLng | LatLngLiteral): void;
    setTitle(title: string): void;
    setIcon(icon: Icon | Symbol | string): void;
    addListener(eventName: string, handler: Function): MapsEventListener;
  }

  class LatLng {
    constructor(lat: number, lng: number, noWrap?: boolean);
    lat(): number;
    lng(): number;
    toString(): string;
  }

  class LatLngBounds {
    constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral);
    extend(point: LatLng | LatLngLiteral): LatLngBounds;
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    setContent(content: string | Node): void;
    open(map: Map, anchor?: MVCObject | Marker): void;
    close(): void;
  }

  class Circle {
    constructor(opts?: CircleOptions);
    setMap(map: Map | null): void;
    setCenter(center: LatLng | LatLngLiteral): void;
    setRadius(radius: number): void;
  }
  
  interface MapsEventListener {
    remove(): void;
  }

  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    clickableIcons?: boolean;
    controlSize?: number;
    disableDefaultUI?: boolean;
    disableDoubleClickZoom?: boolean;
    draggable?: boolean;
    draggableCursor?: string;
    draggingCursor?: string;
    fullscreenControl?: boolean;
    fullscreenControlOptions?: FullscreenControlOptions;
    gestureHandling?: string;
    heading?: number;
    keyboardShortcuts?: boolean;
    mapId?: string;
    mapTypeControl?: boolean;
    mapTypeControlOptions?: MapTypeControlOptions;
    mapTypeId?: string;
    maxZoom?: number;
    minZoom?: number;
    noClear?: boolean;
    panControl?: boolean;
    panControlOptions?: PanControlOptions;
    restriction?: MapRestriction;
    rotateControl?: boolean;
    rotateControlOptions?: RotateControlOptions;
    scaleControl?: boolean;
    scaleControlOptions?: ScaleControlOptions;
    scrollwheel?: boolean;
    streetView?: StreetViewPanorama;
    streetViewControl?: boolean;
    streetViewControlOptions?: StreetViewControlOptions;
    styles?: MapTypeStyle[];
    tilt?: number;
    zoom?: number;
    zoomControl?: boolean;
    zoomControlOptions?: ZoomControlOptions;
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    icon?: string | Icon | Symbol;
    draggable?: boolean;
    animation?: any;
    visible?: boolean;
  }

  interface InfoWindowOptions {
    content?: string | Node;
    position?: LatLng | LatLngLiteral;
    maxWidth?: number;
  }

  interface CircleOptions {
    center?: LatLng | LatLngLiteral;
    clickable?: boolean;
    draggable?: boolean;
    editable?: boolean;
    fillColor?: string;
    fillOpacity?: number;
    map?: Map;
    radius?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokePosition?: number;
    strokeWeight?: number;
    visible?: boolean;
    zIndex?: number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface LatLngBoundsLiteral {
    east: number;
    north: number;
    south: number;
    west: number;
  }

  interface MapRestriction {
    latLngBounds: LatLngBounds | LatLngBoundsLiteral;
    strictBounds?: boolean;
  }

  interface MapTypeControlOptions {
    mapTypeIds?: string[];
    position?: number;
    style?: number;
  }

  interface PanControlOptions {
    position?: number;
  }

  interface RotateControlOptions {
    position?: number;
  }

  interface ScaleControlOptions {
    style?: number;
  }

  interface StreetViewControlOptions {
    position?: number;
  }

  interface ZoomControlOptions {
    position?: number;
  }

  interface FullscreenControlOptions {
    position?: number;
  }

  interface Padding {
    bottom: number;
    left: number;
    right: number;
    top: number;
  }

  interface MapTypeStyle {
    elementType?: string;
    featureType?: string;
    stylers: object[];
  }

  interface MVCObject {}

  interface StreetViewPanorama {}

  interface Symbol {}

  interface Icon {
    url: string;
    anchor?: Point;
    labelOrigin?: Point;
    origin?: Point;
    scaledSize?: Size;
    size?: Size;
  }

  class Point {
    constructor(x: number, y: number);
    x: number;
    y: number;
    equals(other: Point): boolean;
    toString(): string;
  }

  class Size {
    constructor(width: number, height: number, widthUnit?: string, heightUnit?: string);
    height: number;
    width: number;
    equals(other: Size): boolean;
    toString(): string;
  }

  const MapTypeId: {
    ROADMAP: string;
    SATELLITE: string;
    HYBRID: string;
    TERRAIN: string;
  };

  const SymbolPath: {
    BACKWARD_CLOSED_ARROW: number;
    BACKWARD_OPEN_ARROW: number;
    CIRCLE: number;
    FORWARD_CLOSED_ARROW: number;
    FORWARD_OPEN_ARROW: number;
  };
}
