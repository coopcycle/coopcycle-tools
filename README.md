# CoopCycle Tools
---

## Sling flow

1. Login to https://app.sling.com
2. When navigating to the shifts page, click on the "Export CSV" button in the top right.
3. A popup will appear prompting for some details about the export format.
4. Click export.

Behing the scene, the "Export CSV" is injected by this plugin.
When you click on "Export", the authorizaion token is grabbed from your browser and forwarded to a API hosted at https://coopcycle.antoinebagnaud.me
The API fetch all the data from Sling with your authorization token, then convert it into CSV.
