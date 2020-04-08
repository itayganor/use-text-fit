use-text-fit
===

[![npm version](https://badge.fury.io/js/use-text-fit.svg)](https://badge.fury.io/js/use-text-fit)

A hook used to fit text in one line inside its container.

---

Install 
---

```shell script
npm install use-text-fit
```

Usage
---

```typescript jsx
import useTextFit from 'use-text-fit';


function Title() {
    const {ref} = useTextFit();

    return <div ref={ref}>
        Lorem Ipsum
    </div>;
}
```

1. Pass the `ref` to the text container element.
2. *Profit*.