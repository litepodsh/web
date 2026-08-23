import Link from 'next/link';

export default async function HomePage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;

  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">Hello World</h1>
      <p>
        You can open{' '}
        <Link href={`/${lang}/docs`} className="font-medium underline">
          /docs
        </Link>{' '}
        and see the documentation.
      </p>
    </div>
  );
}