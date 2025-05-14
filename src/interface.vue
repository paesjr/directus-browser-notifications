<template>
  <div class="browser-notification">
    <v-button
      v-if="!permissionGranted"
      @click="requestPermission"
      :loading="requesting"
    >
      {{ requesting ? "Requesting..." : "Enable Browser Notifications" }}
    </v-button>
    <div v-else class="status">
      <v-icon name="notifications" />
      <span>Browser notifications enabled</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { useApi } from "@directus/extensions-sdk";

interface Notification {
  id: string;
  subject: string;
  message: string;
  collection?: string;
  item?: string;
}

export default defineComponent({
  name: "BrowserNotification",
  setup() {
    const api = useApi();
    const permissionGranted = ref(false);
    const requesting = ref(false);
    let subscription: any = null;

    // Check if browser supports notifications
    const isSupported = () => {
      return "Notification" in window;
    };

    // Check current permission status
    const checkPermission = () => {
      if (!isSupported()) return;
      permissionGranted.value = Notification.permission === "granted";
    };

    // Request notification permission
    const requestPermission = async () => {
      if (!isSupported()) return;

      requesting.value = true;
      try {
        const permission = await Notification.requestPermission();
        permissionGranted.value = permission === "granted";

        if (permissionGranted.value) {
          // Subscribe to notifications
          subscribeToNotifications();
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      } finally {
        requesting.value = false;
      }
    };

    // Subscribe to Directus notifications
    const subscribeToNotifications = async () => {
      try {
        // Subscribe to the notifications endpoint
        subscription = await api.subscribe("directus_notifications", {
          event: "create",
          callback: (notification: Notification) => {
            showBrowserNotification(notification);
          },
        });
      } catch (error) {
        console.error("Error subscribing to notifications:", error);
      }
    };

    // Show browser notification
    const showBrowserNotification = (notification: Notification) => {
      if (!permissionGranted.value) return;

      const browserNotification = new Notification(
        notification.subject || "New Notification",
        {
          body: notification.message,
          icon: "/admin/assets/logo.svg", // Directus logo
          tag: notification.id,
        }
      );

      // Handle notification click
      browserNotification.onclick = () => {
        window.focus();
        browserNotification.close();

        // If the notification has a collection and item, navigate to it
        if (notification.collection && notification.item) {
          window.location.href = `/admin/content/${notification.collection}/${notification.item}`;
        }
      };
    };

    onMounted(() => {
      checkPermission();
      if (permissionGranted.value) {
        subscribeToNotifications();
      }
    });

    onUnmounted(() => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });

    return {
      permissionGranted,
      requesting,
      requestPermission,
    };
  },
});
</script>

<style scoped>
.browser-notification {
  padding: 12px;
}

.status {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary);
}

.v-icon {
  color: var(--primary);
}
</style>
