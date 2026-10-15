# Centred Virexen Identity form

The VIdentitySignIn component now renders a **single vertically centred group** containing the logo outside the card, the sign-in card, and links/copyright outside below it. It is responsive, including shorter screens where normal scrolling remains possible.

```vue
<VIdentitySignIn application-name="CampPulze" application-logo="/brand.png"
  terms-url="/terms" privacy-url="/privacy" help-url="/help"
  @sign-in="beginOIDCPKCE" />
```

No passwords are captured by the component. The host must begin the authorised Virexen Identity OIDC Authorization Code + PKCE flow. `applicationName` may be omitted when set in the Virexen UI manifest. `identityLogo` overrides the app logo; `cardMaxWidth` overrides the configured width. See `/identity.html` in the sandbox.
