##Beep

###Import
```javascript
/* Import it from the library */
import {Notify} from 'nice-vue-components';
```

###Use

1. Incude "nice-notifications" component in your app/body.
```vue
<nice-notifications/>
```

2. In anyVue component call `this.$notify(params)` fuction to show notification.
```vue
this.$notify({
  ...
});
```

Properties:

| Name       | Type    | Default     |
| ---------- | ------- | ------------|
| name       | String  |             |
