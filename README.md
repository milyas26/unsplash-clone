This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Stack yang Digunakan
1. Next.js dengan Typescript
> ReactJS adalah library JavaScript yang digunakan untuk membangun antarmuka pengguna. Framework Next.js adalah kerangka kerja React yang memungkinkan pengembangan aplikasi web dengan fitur-fitur seperti routing, server-side rendering (SSR), dan static site generation (SSG). Penggunaan Typescript membantu dalam menambahkan tipe statis ke kode JavaScript, sehingga meningkatkan keamanan dan kestabilan.

2. Fetching Data menggunakan React-Query dan Axios
> React-Query adalah library untuk mengelola state dan fetching data dalam aplikasi React. Dalam kombinasi dengan Axios, sebuah library untuk melakukan HTTP request, React-Query memudahkan pengambilan dan manajemen data dari API.

3. State Management menggunakan Context API

> Context API adalah fitur bawaan ReactJS yang digunakan untuk mengelola state global yang dapat diakses oleh komponen-komponen dalam aplikasi. Dengan menggunakan Context API, data dapat dibagikan dan diperbarui di seluruh komponen tanpa perlu melewati prop secara berlebihan.

4. Styling menggunakan Tailwind

> Tailwind adalah sebuah framework CSS yang memberikan utility classes untuk membangun antarmuka dengan cepat. Dengan Tailwind, pengembang dapat dengan mudah menerapkan gaya dan tata letak pada komponen tanpa perlu menulis CSS kustom.

5. Headless UI

> Headless UI adalah kumpulan komponen UI yang sangat ringan dan fleksibel, dirancang untuk digunakan dengan kerangka kerja front-end tertentu. Dalam konteks ini, Headless UI digunakan untuk membangun komponen modal yang sederhana dan dapat digunakan dalam aplikasi.

## Struktur Code menggunakan Atomic Design
Atomic design adalah metodologi pengorganisasian komponen dalam aplikasi berdasarkan kompleksitas dan hierarki mereka. Konsep ini terdiri dari beberapa level komponen seperti atom, molekul, organisme, template, dan halaman. Level-level ini membantu dalam memecah aplikasi menjadi komponen yang lebih kecil dan dapat digunakan kembali.

Dengan menggunakan atomic design, kode diorganisasi menjadi unit-unit yang terpisah dan dapat dipadukan kembali sesuai kebutuhan. Misalnya, atom adalah komponen dasar seperti tombol atau input tunggal, sementara molekul adalah gabungan dari beberapa atom yang bekerja bersama, seperti form dengan beberapa input.

## Membuat Route API untuk Proxy dari Unsplash API
Dalam konteks ini, membuat route API untuk proxy API dari Unsplash API berarti menyediakan endpoint kustom di server untuk mengambil data dari Unsplash API dan meneruskannya ke aplikasi klien. Hal ini umumnya digunakan ketika API klien tidak dapat mengakses endpoint langsung karena pembatasan kebijakan lintas sumber daya (CORS) atau alasan keamanan lainnya.

Dengan membuat route API, aplikasi dapat melakukan permintaan HTTP ke endpoint kustom tersebut, yang kemudian meneruskan permintaan ke Unsplash API, mengambil responsenya, dan mengirimkannya kembali ke aplikasi klien. Ini memungkinkan aplikasi untuk mengambil data dari Unsplash API dengan cara yang diizinkan oleh konfigurasi server.

# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
