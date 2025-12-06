# Framer Motion Layout Animation Fix

## Problem

Expandable cards না animate করে modal এ open হতো।

## Solution

দুটি জিনিস যোগ করতে হবে:

### 1. `LayoutGroup` wrapper

```tsx
import { LayoutGroup } from 'motion/react'
;<LayoutGroup>{/* সব content এখানে */}</LayoutGroup>
```

### 2. `AnimatePresence mode="popLayout"`

```tsx
<AnimatePresence mode="popLayout">{/* modal content */}</AnimatePresence>
```

## Why it works

- `LayoutGroup` - সব `layoutId` গুলোকে একসাথে coordinate করে
- `mode="popLayout"` - exit animation এর সময় element টিকে সঠিক position এ রাখে

## Quick Checklist

- [ ] `LayoutGroup` import করা হয়েছে
- [ ] পুরো component `LayoutGroup` দিয়ে wrap করা
- [ ] Modal এর `AnimatePresence` এ `mode="popLayout"` আছে
