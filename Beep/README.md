##Beep

![](https://media.giphy.com/media/UsF3DykKg8Tpm/giphy.gif)

###Import
```javascript
/* Import it from the library */
import {Beep} from 'nice-vue-components';
```

###Use
```vue
Default: 
<nice-beep />

Customized:
<nice-beep color="#ff1264" :frequency="1500" :size="30" />
```

Properties:

| Name       | Type    | Default     |
| ---------- | ------- | ------------|
| color      | String  | #ff0000     |
| size       | Number  | 14 (px)     |
| frequancy  | Number  | 3000 (ms)   |
| active     | Boolean | true        |
