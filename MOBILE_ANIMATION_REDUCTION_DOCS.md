# 📱 Mobile Animation Reduction System Documentation

## মোবাইল ডিভাইসে এনিমেশন কমানোর সম্পূর্ণ ডকুমেন্টেশন

---

## 📖 সূচিপত্র

1. [ভূমিকা](#ভূমিকা)
2. [কেন মোবাইলে এনিমেশন কমানো হয়?](#কেন-মোবাইলে-এনিমেশন-কমানো-হয়)
3. [মূল Hook: useReducedMotion](#মূল-hook-usereducedmotion)
4. [কিভাবে মোবাইল ডিভাইস ডিটেক্ট করা হয়?](#কিভাবে-মোবাইল-ডিভাইস-ডিটেক্ট-করা-হয়)
5. [বিভিন্ন কম্পোনেন্টে প্রয়োগ](#বিভিন্ন-কম্পোনেন্টে-প্রয়োগ)
6. [Animation Reduction Strategies](#animation-reduction-strategies)
7. [Best Practices](#best-practices)
8. [API Reference](#api-reference)

---

## ভূমিকা

এই portfolio ওয়েবসাইটে একটি শক্তিশালী **Animation Reduction System** ইমপ্লিমেন্ট করা হয়েছে যা মোবাইল ডিভাইসে স্বয়ংক্রিয়ভাবে এনিমেশন কমিয়ে দেয়। এটি দুটি গুরুত্বপূর্ণ কারণে করা হয়েছে:

1. **Performance Optimization** - মোবাইল ডিভাইসের সীমিত হার্ডওয়্যার ক্ষমতা
2. **Accessibility** - ব্যবহারকারীদের reduced motion preference সম্মান করা

---

## কেন মোবাইলে এনিমেশন কমানো হয়?

### 🔋 ১. ব্যাটারি এবং পারফরম্যান্স

মোবাইল ডিভাইসগুলোতে সাধারণত:

| সমস্যা              | বিবরণ                                                     |
| ------------------- | --------------------------------------------------------- |
| **সীমিত GPU**       | মোবাইল GPU ডেস্কটপের তুলনায় অনেক দুর্বল                  |
| **কম RAM**          | জটিল এনিমেশন বেশি মেমরি ব্যবহার করে                       |
| **ব্যাটারি ড্রেন**  | Continuous animations ব্যাটারি দ্রুত শেষ করে              |
| **থার্মাল থ্রটলিং** | অতিরিক্ত এনিমেশন ফোন গরম করে এবং পারফরম্যান্স কমিয়ে দেয় |

### ♿ ২. Accessibility (অ্যাক্সেসিবিলিটি)

কিছু ব্যবহারকারী `prefers-reduced-motion: reduce` সেটিং ব্যবহার করেন কারণ:

- **Vestibular disorders** - মাথা ঘোরা বা বমি বমি ভাব হতে পারে
- **Seizure sensitivity** - দ্রুত এনিমেশন seizure trigger করতে পারে
- **Attention difficulties** - এনিমেশন মনোযোগ নষ্ট করতে পারে
- **Motion sickness** - কিছু মানুষের এনিমেশন দেখলে অস্বস্তি হয়

### 📊 ৩. User Experience

| Desktop                          | Mobile                                  |
| -------------------------------- | --------------------------------------- |
| বড় স্ক্রিন, এনিমেশন সুন্দর লাগে | ছোট স্ক্রিন, অতিরিক্ত এনিমেশন বিরক্তিকর |
| মাউস দিয়ে interact করা হয়      | টাচ দিয়ে দ্রুত navigate করা হয়        |
| পাওয়ার সোর্স সাধারণত প্লাগ ইন   | ব্যাটারি দিয়ে চলে                      |

---

## মূল Hook: useReducedMotion

এই সিস্টেমের মূল ভিত্তি হলো `useReducedMotion` hook:

```typescript
// src/hooks/use-reduced-motion.ts

import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Step 1: Check OS-level reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Step 2: Check if it's a mobile device
    const isMobileDevice = () => {
      return (
        ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
        window.innerWidth < 768
      )
    }

    // Step 3: Combine both checks
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches || isMobileDevice())
    }

    // Initial check
    updateMotionPreference()

    // Listen for changes
    mediaQuery.addEventListener('change', updateMotionPreference)
    window.addEventListener('resize', updateMotionPreference)

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference)
      window.removeEventListener('resize', updateMotionPreference)
    }
  }, [])

  return prefersReducedMotion
}
```

### Hook এর কাজ করার ধাপ:

```
┌─────────────────────────────────────────────────────────────┐
│                    useReducedMotion()                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐         ┌─────────────────┐           │
│  │   Media Query   │   OR    │  Mobile Device  │           │
│  │    Check        │         │     Check       │           │
│  └────────┬────────┘         └────────┬────────┘           │
│           │                           │                     │
│           v                           v                     │
│  prefers-reduced-motion     Touch + Width < 768px           │
│       == reduce                                             │
│           │                           │                     │
│           └───────────┬───────────────┘                     │
│                       │                                     │
│                       v                                     │
│              ┌───────────────┐                              │
│              │ prefersReducedMotion = true                  │
│              │ (যেকোনো একটি true হলে)                       │
│              └───────────────┘                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## কিভাবে মোবাইল ডিভাইস ডিটেক্ট করা হয়?

### দুইটি শর্ত একসাথে পূরণ হতে হবে:

```typescript
const isMobileDevice = () => {
  return (
    // শর্ত ১: টাচ সাপোর্ট আছে কি?
    ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
    // শর্ত ২: স্ক্রিন 768px এর চেয়ে ছোট কি?
    window.innerWidth < 768
  )
}
```

### বিস্তারিত ব্যাখ্যা:

#### 🖐️ Touch Detection

```typescript
'ontouchstart' in window
```

- ব্রাউজারে `ontouchstart` event আছে কিনা চেক করে
- বেশিরভাগ টাচ ডিভাইসে এটি `true` হয়

```typescript
navigator.maxTouchPoints > 0
```

- ডিভাইসে কতটি টাচ পয়েন্ট সাপোর্টেড তা চেক করে
- আধুনিক টাচ ডিভাইসে সাধারণত 5 বা তার বেশি হয়
- Laptop touchpad এ সাধারণত 1-2 হয়

#### 📐 Screen Width Check

```typescript
window.innerWidth < 768
```

- 768px হলো Tailwind CSS এর `md` breakpoint
- এর চেয়ে ছোট স্ক্রিন মোবাইল/ট্যাবলেট হিসেবে ধরা হয়

### কেন দুটো শর্ত?

| শুধু Touch                   | শুধু Width                         | দুটোই                          |
| ---------------------------- | ---------------------------------- | ------------------------------ |
| ❌ Laptop touchpad ধরে ফেলবে | ❌ Narrow desktop window ধরে ফেলবে | ✅ সঠিকভাবে মোবাইল ডিটেক্ট করে |

---

## বিভিন্ন কম্পোনেন্টে প্রয়োগ

### ১. 🎨 AnimatedGridPattern - Grid Pattern Animation

```typescript
// src/components/ui/animated-grid-pattern.tsx

export function AnimatedGridPattern({ numSquares = 50, ... }) {
  const prefersReducedMotion = useReducedMotion()

  // মোবাইলে squares এর সংখ্যা কমিয়ে দেওয়া হয়
  const actualNumSquares = prefersReducedMotion
    ? Math.min(numSquares, 10)  // সর্বোচ্চ 10টি
    : numSquares                 // ডেস্কটপে সব

  // Animation transition পরিবর্তন
  <motion.rect
    transition={{
      duration: prefersReducedMotion ? 0.3 : duration,  // কম duration
      repeat: prefersReducedMotion ? 0 : 1,             // কোনো repeat নেই
      delay: prefersReducedMotion ? 0 : index * 0.1,    // কোনো delay নেই
    }}
    onAnimationComplete={() => {
      // মোবাইলে repositioning বন্ধ
      if (!prefersReducedMotion) {
        updateSquarePosition(id)
      }
    }}
  />
}
```

**কি করা হয়েছে:**

- ✅ Square সংখ্যা 50 থেকে 10 এ কমানো
- ✅ Animation duration কমানো
- ✅ Repeat animation বন্ধ
- ✅ Staggered delay বাদ দেওয়া
- ✅ Position update বন্ধ করা

---

### ২. 💫 BorderBeam - Border Glow Animation

```typescript
// src/components/magicui/border-beam.tsx

export const BorderBeam = ({ ... }) => {
  const prefersReducedMotion = useReducedMotion()

  // মোবাইলে পুরো component টাই render করা হয় না
  if (prefersReducedMotion) {
    return null
  }

  return (
    <motion.div
      animate={{
        offsetDistance: ['0%', '100%'],
      }}
      transition={{
        repeat: Infinity,
        ease: 'linear',
        duration,
      }}
    />
  )
}
```

**কি করা হয়েছে:**

- ✅ সম্পূর্ণ component বাদ দেওয়া হয়েছে
- এটি সবচেয়ে aggressive optimization কারণ এই animation GPU-intensive

---

### ৩. ⭐ DotPattern - Dot Background Pattern

```typescript
// src/components/magicui/dot-pattern.tsx

export function DotPattern({ glow = false, ... }) {
  const prefersReducedMotion = useReducedMotion()

  // Dots সংখ্যা লিমিট করা
  const maxDots = prefersReducedMotion ? 100 : Infinity
  const dotsToRender = Math.min(totalDots, maxDots)

  // Glow animation বন্ধ করা
  const shouldAnimate = glow && !prefersReducedMotion

  return (
    <motion.circle
      animate={
        shouldAnimate
          ? { opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }
          : { opacity: 0.6 }  // Static opacity
      }
      transition={
        shouldAnimate
          ? { duration: dot.duration, repeat: Infinity, ... }
          : { duration: 0 }  // Instant
      }
    />
  )
}
```

**কি করা হয়েছে:**

- ✅ সর্বোচ্চ 100টি dot render করা
- ✅ Glow animation সম্পূর্ণ বাদ
- ✅ Static opacity দেখানো

---

### ৪. 🏠 HeroSection - Hero Animation

```typescript
// src/components/home/hero-section.tsx

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      {/* Background Pattern - শুধু ডেস্কটপে */}
      {!prefersReducedMotion && (
        <AnimatedGridPattern />
      )}

      {/* Gradient Orbs - মোবাইলে static */}
      <motion.div
        animate={
          prefersReducedMotion
            ? { scale: 1, opacity: 0.5 }           // Static state
            : { scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }  // Animated
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }                      // Instant
            : { duration: 8, repeat: Infinity }   // Full animation
        }
      />

      {/* Floating Icons - শুধু ডেস্কটপে */}
      {!prefersReducedMotion && floatingIcons.map(...)}

      {/* Rotating Border - মোবাইলে static */}
      <motion.div
        animate={prefersReducedMotion ? { rotate: 0 } : { rotate: 360 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 20, repeat: Infinity, ease: 'linear' }
        }
      />
    </>
  )
}
```

**কি করা হয়েছে:**

- ✅ AnimatedGridPattern বাদ
- ✅ Floating icons বাদ
- ✅ Gradient orbs static করা
- ✅ Rotating border বন্ধ করা

---

### ৫. 🎯 Skills, Projects, Contact Sections

প্রতিটি section এ একই pattern follow করা হয়েছে:

```typescript
const SectionComponent = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section>
      {/* Pattern শুধু ডেস্কটপে */}
      {!prefersReducedMotion && <DotPattern />}

      {/* Animated orbs - conditional animation */}
      <motion.div
        animate={
          prefersReducedMotion
            ? { x: 0, opacity: 0.4 }
            : { x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 10, repeat: Infinity }
        }
      />
    </section>
  )
}
```

---

## Animation Reduction Strategies

এই codebase এ তিনটি প্রধান strategy ব্যবহার করা হয়েছে:

### Strategy 1: Complete Removal (সম্পূর্ণ বাদ দেওয়া)

```typescript
{!prefersReducedMotion && <AnimatedComponent />}
```

**কখন ব্যবহার করবেন:**

- GPU-intensive animations (যেমন BorderBeam)
- Decorative animations যা content এ প্রভাব ফেলে না
- Background patterns

### Strategy 2: Static Fallback (Static Version দেখানো)

```typescript
<motion.div
  animate={
    prefersReducedMotion
      ? { opacity: 0.5 }                    // Static
      : { opacity: [0.3, 0.7, 0.3] }        // Animated
  }
/>
```

**কখন ব্যবহার করবেন:**

- Visual elements যা থাকা দরকার কিন্তু animate হওয়া জরুরি না
- Hover states
- Gradient orbs

### Strategy 3: Reduced Animation (কম Animation)

```typescript
<motion.rect
  transition={{
    duration: prefersReducedMotion ? 0.3 : 4,
    repeat: prefersReducedMotion ? 0 : Infinity,
  }}
/>
```

**কখন ব্যবহার করবেন:**

- Essential UI feedback animations
- Micro-interactions
- Loading states

---

## Best Practices

### ✅ Do's (করুন)

```typescript
// 1. Hook একবারই call করুন component এ
const prefersReducedMotion = useReducedMotion()

// 2. Early return ব্যবহার করুন intensive animations এ
if (prefersReducedMotion) return null

// 3. Conditional rendering ব্যবহার করুন
{!prefersReducedMotion && <HeavyAnimation />}

// 4. Static fallback দিন
animate={prefersReducedMotion ? staticState : animatedState}
```

### ❌ Don'ts (করবেন না)

```typescript
// 1. প্রতিটি element এ আলাদা করে check করবেন না
<div style={{ opacity: useReducedMotion() ? 1 : 0.5 }} />

// 2. Animation সম্পূর্ণ বাদ দিলে UI broken দেখাবে না
// ❌ এমন কিছু করবেন না যেখানে animation ছাড়া content দেখা যায় না

// 3. User preference ignore করবেন না
// ❌ force animation when user has reduced motion enabled
```

---

## API Reference

### useReducedMotion()

```typescript
function useReducedMotion(): boolean
```

**Returns:** `boolean`

- `true` - Reduced motion চালু (মোবাইল বা user preference)
- `false` - Full animations চালানো যাবে

**Example:**

```typescript
const MyComponent = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      animate={{
        x: prefersReducedMotion ? 0 : 100,
      }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
      }}
    />
  )
}
```

### useIsMobile()

```typescript
function useIsMobile(): boolean
```

**Returns:** `boolean`

- `true` - Device is mobile (touch + small screen)
- `false` - Device is desktop

**Note:** এই hook টি `useReducedMotion` এর ভেতরেও ব্যবহৃত হয়।

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     User Visits Website                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           v
              ┌────────────────────────┐
              │   useReducedMotion()   │
              │         called         │
              └───────────┬────────────┘
                          │
            ┌─────────────┴─────────────┐
            │                           │
            v                           v
    ┌───────────────┐          ┌───────────────┐
    │ Check Media   │          │ Check Device  │
    │    Query      │          │     Type      │
    └───────┬───────┘          └───────┬───────┘
            │                           │
            v                           v
    ┌───────────────┐          ┌───────────────┐
    │ User prefers  │          │ Touch + Width │
    │ reduced motion│          │    < 768px    │
    └───────┬───────┘          └───────┬───────┘
            │                           │
            └───────────┬───────────────┘
                        │
                        v
              ┌──────────────────┐
              │   Either true?   │
              └────────┬─────────┘
                       │
           ┌───────────┴───────────┐
           │                       │
           v                       v
    ┌─────────────┐         ┌─────────────┐
    │   return    │         │   return    │
    │    true     │         │    false    │
    │ ┌─────────┐ │         │ ┌─────────┐ │
    │ │ Reduced │ │         │ │  Full   │ │
    │ │Animation│ │         │ │Animation│ │
    │ └─────────┘ │         │ └─────────┘ │
    └─────────────┘         └─────────────┘
```

---

## সারসংক্ষেপ

| বিষয়                   | মোবাইল                   | ডেস্কটপ              |
| ----------------------- | ------------------------ | -------------------- |
| **Background Patterns** | ❌ বাদ                   | ✅ দেখায়            |
| **Border Beam**         | ❌ বাদ                   | ✅ animate করে       |
| **Dot Pattern**         | 📉 100 dots max, no glow | ✅ সব dots, glow আছে |
| **Grid Pattern**        | 📉 10 squares max        | ✅ 50 squares        |
| **Gradient Orbs**       | ⏸️ Static                | ✅ Animated          |
| **Floating Icons**      | ❌ বাদ                   | ✅ animate করে       |
| **Rotating Effects**    | ⏸️ Static                | ✅ Rotating          |

---

## উপসংহার

এই Animation Reduction System একটি **performance-first approach** follow করে যেখানে:

1. **Mobile users পান:** দ্রুত লোড হওয়া, smooth scrolling, কম ব্যাটারি ব্যবহার
2. **Accessibility users পান:** comfortable browsing experience
3. **Desktop users পান:** rich, immersive animations

এভাবে সব ধরনের users কে একটি optimal experience দেওয়া সম্ভব হয়। 🎉

---

_Last Updated: December 2024_
_Created for portfolio-with-convex project_
