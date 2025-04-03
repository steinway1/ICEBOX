// General
import { onContentLoaded } from "./general/utils";
import PageManager from "./general/page-manager";

// Pages
import LaunchPage from "./pages/launch";

onContentLoaded(() => {
  new PageManager([
    {
      instance: LaunchPage,
      rootSelector: ".page_launch",
    },
  ]);
});
