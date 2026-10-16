// Realistic demonstration props for the public component catalogue.
// Keep this data sample-only; never load production information here.
export const previewFixtures: Record<string, Record<string, unknown>> = {
  VSettingsLinkCard:{title:"General",description:"Basic settings for your Virexen environment, company details and regional preferences.",icon:"settings"},
  VPaymentBrandIcon:{brand:"visa",size:52},
  VProductCard: {currency:"USD"},
  VProductSelector: {currency:"USD"},
  VQuantitySelector: {currency:"USD"},
  VDiscountCode: {currency:"USD"},
  VDiscountBadge: {currency:"USD"},
  VBillingCycleSelector: {currency:"USD"},
  VPlanComparison: {currency:"USD"},
  VCheckoutSteps: {currency:"USD"},
  VPaymentMethodSelector: {currency:"USD"},
  VPaymentMethodForm: {currency:"USD"},
  VSecurePaymentNotice: {currency:"USD"},
  VPaymentSchedule: {currency:"USD"},
  VCheckoutSummary: {currency:"USD"},
  VPaymentStatus: {currency:"USD"},
  VPaymentConfirmation: {currency:"USD"},
  VInvoiceCard: {currency:"USD"},
  VInvoiceLineItems: {currency:"USD"},
  VInvoiceTimeline: {currency:"USD"},
  VReceiptPreview: {currency:"USD"},
  VSubscriptionCard: {currency:"USD"},
  VPlanChangeSummary: {currency:"USD"},
  VRenewalNotice: {currency:"USD"},
  VOverdueNotice: {currency:"USD"},
  VTransactionList: {currency:"USD"},
  VTransactionDetails: {currency:"USD"},
  VRefundSummary: {currency:"USD"},
  VAccountBalance: {currency:"USD"},
  VFeeBreakdown: {currency:"USD"},

  VAvatarEditor:{size:148,borderRadius:'50%',crop:true,label:'Change photo'},
  VBottomNavigation:{items:[{id:'home',label:'Home',icon:'home'},{id:'wallet',label:'Wallet',icon:'finance'},{id:'analytics',label:'Analytics',icon:'chart'},{id:'settings',label:'Settings',icon:'settings'}],modelValue:'home',variant:'pill',showLabels:true,preview:true,visibility:'always'},
  VSecureInput:{modelValue:'',label:'Password',placeholder:'Enter a secure value',revealable:true},
  VCodeInput:{modelValue:'123',length:6,label:'Verification code'},
  VRichTextEditor:{label:'Message',modelValue:'<h2>Welcome to Virexen</h2><p>Write your message here. <strong>Formatting</strong> is available in the toolbar.</p>'},

  "VSelect": {
    "modelValue": "one",
    "options": [
      {
        "label": "First option",
        "value": "one"
      },
      {
        "label": "Second option",
        "value": "two"
      }
    ]
  },
  "VSearchSelect": {
    "modelValue": "one",
    "options": [
      {
        "label": "First option",
        "value": "one"
      },
      {
        "label": "Second option",
        "value": "two"
      }
    ]
  },
  "VMultiSelect": {
    "modelValue": [
      "one"
    ],
    "options": [
      {
        "label": "First option",
        "value": "one"
      },
      {
        "label": "Second option",
        "value": "two"
      }
    ]
  },
  "VTabs": {
    "modelValue": "overview",
    "tabs": [
      {
        "id": "overview",
        "label": "Overview"
      },
      {
        "id": "settings",
        "label": "Settings"
      }
    ]
  },
  "VPagination": {
    "modelValue": 2,
    "pages": 5
  },
  "VBreadcrumbs": {
    "items": [
      {
        "label": "Home",
        "href": "/"
      },
      {
        "label": "Examples",
        "href": "/forms.html"
      },
      {
        "label": "Current"
      }
    ]
  },
  "VCommandPalette": {
    "open": true,
    "commands": [
      {
        "id": "settings",
        "label": "Settings"
      },
      {
        "id": "account",
        "label": "Account"
      }
    ]
  },
  "VModal": {
    "open": true,
    "title": "Example modal"
  },
  "VDrawer": {
    "open": true,
    "title": "Example drawer"
  },
  "VConfirmDialog": {
    "open": true,
    "title": "Confirm action"
  },
  "VDetailDrawer": {
    "open": true,
    "title": "Profile details"
  },
  "VDataTable": {
    "rows": [
      {
        "id": 1,
        "name": "Alex",
        "status": "Active"
      },
      {
        "id": 2,
        "name": "Jordan",
        "status": "Pending"
      }
    ],
    "columns": [
      {
        "key": "name",
        "label": "Name"
      },
      {
        "key": "status",
        "label": "Status"
      }
    ]
  },
  "VDataGrid": {
    "rows": [
      {
        "id": 1,
        "name": "Alex",
        "status": "Active"
      },
      {
        "id": 2,
        "name": "Jordan",
        "status": "Pending"
      }
    ],
    "columns": [
      {
        "key": "name",
        "label": "Name"
      },
      {
        "key": "status",
        "label": "Status"
      }
    ]
  },
  "VAdvancedTable": {
    "rows": [
      {
        "id": 1,
        "name": "Alex",
        "status": "Active"
      },
      {
        "id": 2,
        "name": "Jordan",
        "status": "Pending"
      }
    ],
    "columns": [
      {
        "key": "name",
        "label": "Name"
      },
      {
        "key": "status",
        "label": "Status"
      }
    ]
  },
  "VFormWorkflow": {
    "modelValue": {
      "name": "Alex"
    },
    "sections": [
      {
        "id": "info",
        "title": "Information",
        "fields": [
          {
            "key": "name",
            "label": "Name",
            "type": "text",
            "required": true
          }
        ]
      }
    ]
  },
  "VAddressInput": {
    "modelValue": {
      "country": "GB",
      "addressLine1": "",
      "addressLine2": "",
      "city": "",
      "region": null,
      "postalCode": ""
    }
  },
  "VRegionSelect": {
    "country": "US",
    "modelValue": "CA"
  },
  "VPostalCodeInput": {
    "country": "GB",
    "modelValue": "SW1A 1AA"
  },
  "VGoogleAddressAutocomplete": {
    "googleApiKey": "",
    "country": "GB"
  },
  "VCalendar": {
    "events": []
  },
  "VScheduler": {
    "events": [],
    "resources": []
  },
  "VChart": {
    "title": "Monthly signups",
    "data": [
      {
        "label": "July",
        "value": 24
      },
      {
        "label": "August",
        "value": 33
      },
      {
        "label": "September",
        "value": 29
      }
    ]
  },
  "VNotificationCentre": {
    "items": [
      {
        "id": "1",
        "title": "Welcome",
        "message": "Your account is ready",
        "read": false
      }
    ]
  },
  "VPriceBreakdown": {
    "adjustments": [{"id":"discount","label":"Discount","amount":-50},{"id":"tax","label":"Tax (8.5%)","amount":51}],
    "items": [
      {
        "id":"session", "label": "Session 1", "subtitle":"Day Camp", "icon":"camp",
        "amount": 500
      },
      {
        "id":"transport", "label": "Transportation", "subtitle":"Round Trip", "icon":"finance",
        "amount": 150
      }
    ]
  },
  "VSubscriptionPricing": {"heading":"Find your perfect plan","subtitle":"Choose the tools you need, with room to grow.","currency":"GBP","period":"month","modelValue":"growth","plans":[{"id":"starter","name":"Starter","description":"For individuals and small projects","price":9.99,"features":["1 project","Basic analytics","Email support"],"cta":"Start with Starter"},{"id":"growth","name":"Growth","description":"More features for growing teams","price":29,"featured":true,"badge":"Best value","features":["Unlimited projects","Advanced reporting","Priority support","Team collaboration"],"cta":"Choose Growth"},{"id":"enterprise","name":"Enterprise","description":"Dedicated solutions at scale","price":89,"features":["Everything in Growth","Custom integrations","Dedicated support","Advanced permissions"],"cta":"Talk to us"}]},

  "VPaymentMethod": {
    "brand": "Visa",
    "isDefault": true,
    "last4": "4242",
    "holder": "Alex Morgan",
    "expiryMonth": 12,
    "expiryYear": 2028
  },
  "VCurrencyAmount": {
    "value": 129.99,
    "currency": "GBP"
  },
  "VStatusState": {
    "state": "empty",
    "title": "No notifications"
  },
  "VMetricTile": {
    "title": "Active campers",
    "value": 1284
  },
  "VChartTile": {
    "title": "Enrolments",
    "data": [
      {
        "label": "Jan",
        "value": 12
      },
      {
        "label": "Feb",
        "value": 19
      }
    ]
  },
  "VActionTile": {
    "title": "Manage campers",
    "description": "Open camper records"
  },
  "VStatusTile": {
    "title": "API Health",
    "status": "healthy"
  },
  "VProfileTile": {
    "name": "Alex Morgan",
    "subtitle": "Counselor"
  },
  "VProgressTile": {
    "title": "Onboarding",
    "value": 75
  },
  "VActivityTile": {
    "title": "Recent activity",
    "items": []
  },
  "VDashboardGrid": {
    "modelValue": [
      "revenue",
      "users"
    ],
    "editable": true,
    "availableItems": [
      {
        "id": "revenue",
        "label": "Revenue",
        "span": 6
      },
      {
        "id": "users",
        "label": "Users",
        "span": 6
      }
    ]
  },
  "VSidebar": {
    "items": [
      {
        "id": "home",
        "label": "Home",
        "icon": "home"
      },
      {
        "id": "settings",
        "label": "Settings",
        "icon": "settings"
      }
    ],
    "activeId": "home"
  },
  "VAppSwitcher": {"apps":[{"id":"virexen","label":"Virexen","logoUrl":"https://edge.virexen.com/brands/Virexen/SVG/Virexen.svg","href":"https://virexen.com"},{"id":"pay","label":"Virexen Pay","logoUrl":"https://edge.virexen.com/brands/Virexen-Pay/SVG/Virexen-Pay.svg","href":"https://pay.virexen.com"},{"id":"my","label":"My Virexen","logoUrl":"https://edge.virexen.com/brands/My-Virexen/SVG/My-Virexen.svg","href":"https://my.virexen.com"},{"id":"workspace","label":"Workspace","logoUrl":"https://edge.virexen.com/brands/Virexen-Workspace/SVG/Virexen-Workspace.svg","href":"https://workspace.virexen.com"},{"id":"support","label":"Support","logoUrl":"https://edge.virexen.com/brands/Virexen-Support/SVG/Virexen-Support.svg","href":"https://support.virexen.com"},{"id":"marlo","label":"Marlo","logoUrl":"https://edge.virexen.com/brands/Marlo/SVG/Marlo.svg","href":"https://marlo.virexen.com"}],"activeId":"virexen","display":"grid","trigger":"launcher"},
  "VPermissionMenu": {"items":[{"id":"overview","label":"Overview","icon":"home"},{"id":"reports","label":"Reports","permission":"reports:view"},{"id":"settings","label":"Settings","permission":"settings:manage"}],"permissions":["reports:view","settings:manage"]},
  "VNameInput": {
    "modelValue": {
      "first": "Alex",
      "middle": "",
      "last": "Morgan"
    }
  },
  "VValidatedDate": {
    "modelValue": "2026-10-15"
  },
  "VDatePicker": {
    "modelValue": "2026-10-15"
  },
  "VDateRange": {
    "start": "2026-10-01",
    "end": "2026-10-15"
  },
  "VDateTimePicker": {
    "modelValue": "2026-10-15T12:00"
  },
  "VTimePicker": {
    "modelValue": "12:00"
  },
  "VEmailInput": {
    "modelValue": "alex@example.com",
    "label": "Email"
  },
  "VDateOfBirth": {
    "modelValue": "2000-06-15",
    "minAge": 18
  },
  "VPhoneInput": {
    "modelValue": "",
    "defaultCountry": "GB"
  },
  "VCountrySelect": {
    "modelValue": "GB"
  },
  "VLanguageSelect": {
    "modelValue": "en-GB"
  },
  "VTimezoneSelect": {
    "modelValue": "Europe/London"
  },
  "VFileManager": {
    "multiple": true,
    "maxSizeMb": 10
  },
  "VImageUploader": {
    "crop": true
  },
  "VMediaGallery": {
    "items": []
  },
  "VDocumentViewer": {
    "src": ""
  },
  "VUploadProgress": {
    "progress": 65
  },
  "VUserMenu": {"user":{"name":"Alex Morgan","email":"alex@example.com","secured":true,"initials":"AM"},"items":[{"id":"profile","label":"My profile","icon":"user"},{"id":"settings","label":"Account settings","icon":"settings"},{"id":"workspaces","label":"My workspaces","icon":"building"}],"showAppearance":true,"appearance":"system"},
  "VAppHeader": {
    "title": "Virexen Cloud"
  },
  "VPageHeader": {
    "title": "Overview",
    "description": "Component preview"
  },
  "VInvoicePreview": {
    "number": "INV-2026-0042", "issuer": "Virexen Pay", "customer": "Alex Morgan", "date": "15 Oct 2026", "dueDate": "29 Oct 2026", "status": "Unpaid", "lines": [{"description":"Camp session", "quantity":1,"unitPrice":500},{"description":"Transport", "quantity":1,"unitPrice":150}]
  },
  "VOrderSummary": {
    "items": []
  },
  "VSessionSelectCard": {
    "title": "Session 1",
    "price": 500
  },
  "VProductSelectCard": {
    "badge":"Most popular",
    "features":["Includes setup and support"],
    "title": "Sample product",
    "price": 25
  },
  "VProfileView": {
    "name": "Alex Morgan"
  },
  "VProfileLayout": {
    "title": "Profile"
  },
  "VSettingsLayout": {
    "title": "Settings"
  },
  "VWizardLayout": {
    "steps": [
      {
        "id": "one",
        "title": "Details"
      },
      {
        "id": "two",
        "title": "Confirm"
      }
    ]
  },
  "VAnimatedNumber": {
    "value": 1284
  },
  "VProgress": {
    "label": "Completion",
    "value": 65
  },
  "VStatCard": {
    "label": "Active users",
    "value": 1284
  },
  "VSkeleton": {
    "width": "65%",
    "height": "20px"
  },
  "VEmptyState": {
    "title": "No records",
    "description": "Nothing to display"
  },
  "VBadge": {
    "tone": "success"
  },
  "VAlert": {
    "title": "Information",
    "description": "A sample alert"
  },
  "VNotification": {
    "type": "success",
    "title": "Saved",
    "description": "Changes have been saved"
  },
  "VFeedbackBanner": {
    "title": "Changes saved"
  },
  "VUnsavedChanges": {
    "open": true
  },
  "VTooltip": {
    "text": "Helpful information"
  },
  "VFloatingPopover": {
    "modelValue": true,
    "label": "Popover preview"
  },
  "VIcon": {
    "name": "settings",
    "size": 24
  },
  "VButton": {
    "variant": "primary"
  },
  "VBrandLogo": {
    "brand": "Virexen-Identity",
    "format": "svg",
    "size": 64
  },
  "VInput": {
    "label": "First name",
    "placeholder": "Enter a name"
  },
  "VTextarea": {
    "label": "Message",
    "placeholder": "Write a message"
  },
  "VValidatedInput": {
    "label": "Username",
    "minLength": 3
  },
  "VFormField": {
    "label": "Email address"
  },
  "VCheckbox": {
    "label": "I agree"
  },
  "VSwitch": {
    "label": "Enable notifications"
  },
  "VMaskedInput": {
    "mask": "###-###",
    "modelValue": ""
  },
  "VCurrencyInput": {
    "currency": "GBP",
    "modelValue": 45
  },
  "VSpacer": {
    "size": 12
  },
  "VDivider": {},
  "VAspectRatio": {
    "ratio": 1.8
  },
  "VScrollArea": {
    "height": "120px"
  },
  "VResponsiveCardGrid": {
    "columns": 2
  },
  "VCustomTile": {
    "title": "Custom widget"
  }
};