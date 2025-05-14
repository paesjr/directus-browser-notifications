import { defineInterface } from "@directus/extensions-sdk";
import InterfaceComponent from "./interface.vue";

export default defineInterface({
  id: "browser-notification",
  name: "Browser Notification",
  icon: "notifications",
  description: "Browser notification interface for Directus",
  component: InterfaceComponent,
  options: null,
  types: ["string"],
  localTypes: ["standard"],
  group: "other",
});
