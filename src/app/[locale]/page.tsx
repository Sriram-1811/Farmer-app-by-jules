import {useTranslations} from 'next-intl';

export default function Index({params: {locale}}: {params: {locale: string}}) {
  const t = useTranslations('Index');
  return <h1>{t('title')}</h1>;
}
