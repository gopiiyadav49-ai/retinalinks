export type PanelData = {
  id: string;
  label: string;
  color: string; // matches existing palette
  image: string; // project showcase preview image
  z: number;
  xOffset: number;
  yOffset: number;
};

export const PANELS: PanelData[] = [
  { id: "web-design",      label: "Website",     color: "#F5C6A5", image: "/previews/project-web-v2.jpg",   z: 0,   xOffset: 0.0,   yOffset: 0.0 },
  { id: "app-development", label: "Mobile App",  color: "#C3BFF0", image: "/previews/project-app.jpg",     z: -8,  xOffset: -0.06, yOffset: -0.03 },
  { id: "web-app",         label: "Web App",     color: "#A9DCD9", image: "/previews/project-webapp.jpg",  z: -16, xOffset: 0.06,  yOffset: 0.04 },
  { id: "branding",        label: "Brand",       color: "#F0B8C4", image: "/previews/project-brand-v2.jpg", z: -24, xOffset: -0.06, yOffset: -0.04 },
  { id: "ui-ux",           label: "UI/UX",       color: "#F5DDA0", image: "/previews/project-uiux.jpg",    z: -32, xOffset: 0.05,  yOffset: 0.03 },
  { id: "maintenance",     label: "Product",     color: "#F5C6A5", image: "/previews/project-product.jpg", z: -40, xOffset: -0.04, yOffset: 0.0 },
];

export const DOLLY_START_Z = 5;
export const DOLLY_END_Z = -35;
