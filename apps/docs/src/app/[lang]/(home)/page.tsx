import { redirect } from 'next/navigation';

export default async function HomePage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;

  redirect(`/${lang}/docs`);
}
