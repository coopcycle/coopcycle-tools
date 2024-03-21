## Sling flow

There is 3 token needed to authorize Sling:
- Oauth client id
- Oauth client secret
- Sling authorisation token (from the user)

1. The addon collect the Auth cookie from Sling
2. Forward the auth to coopcycle
3. CoopCycle server create the oauth client with the right redirect url and store the id and secret.
4. Then we authorize the client to use our server by calling the `api.getsling.com/authorize`

