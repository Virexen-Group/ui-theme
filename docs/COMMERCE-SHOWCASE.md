# Commerce UI showcase

Open `/commerce.html` and scroll to the interactive gallery. Each reusable component has an individual named export from `@virexen-group/ui-theme/vue`. For detailed snippets use **View code** in its documentation card.

### Product selector
```vue
<VProductSelectCard v-model="selected" title="Sample product" description="One-time purchase" badge="Most popular" :price="25" :features="['Includes setup and support']"/>
```

### Checkout
```vue
<VProductSelector :items="[{id:'meal',label:'Meal plan',price:75},{id:'transport',label:'Transport',price:150}]" @select="onSelect"/>
<VCheckoutSummary :items="cartItems" currency="USD" :discount="50" :tax="51" @action="onCheckoutAction"/>
```

All showcase data are illustrative. `VPaymentMethodForm` is a UI demonstration **only**: production cards must use provider-hosted card collection through Virexen Pay / Stripe Elements, with no raw PAN/CVC in app state or logs. A click or action event does not process a payment; caller handles API requests. Amounts are presentation values, not authoritative billing calculations.

The new commerce widgets are thin named wrappers around a shared renderer, to keep their visual language consistent while avoiding dozens of copy-pasted component trees. Extend the required business behaviour in your application API.
