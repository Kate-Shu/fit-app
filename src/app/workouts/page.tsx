import Head from "next/head";

// После того, как файл помечен "use client", все его импорты и дочерние компоненты считаются частью клиентского пакета . Это означает, что вам не нужно добавлять директиву к каждому компоненту, предназначенному для клиента.
export default function WorkoutsPage() {
 return (
  <>
   <Head>
    <title>Wotkouts</title>
    <meta name="description" content="Workouts" />
   </Head>
   <div>Workouts page</div>
  </>)
}