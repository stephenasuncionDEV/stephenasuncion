import { FC } from 'react'
import Head from 'next/head'

export interface MetaProps {
    title: string
}

const Meta: FC<MetaProps> = ({ title }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content='Stephen Asuncion | Portfolio Website' />
            <meta name="description" content='Portfolio website of Stephen Asuncion' />
            <meta name="keywords" content='Stephen Asuncion' />
            <meta name="robots" content='index, follow' />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content='en' />
            <meta name="theme-color" content="#348CD4" />
            
            <meta property="og:type" content='website' />
            <meta property="og:url" content='https://stephenasuncion.dev/' />
            <meta property="og:title" content='Stephen Asuncion | Portfolio Website' />
            <meta property="og:description" content='Portfolio website of Stephen Asuncion' />
            <meta property="og:image" content='/assets/images/meta.png' />
            <meta property="og:site_name" content='Stephen Asuncion' />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content='https://stephenasuncion.dev/' />
            <meta property="twitter:title" content='Stephen Asuncion | Portfolio Website' />
            <meta property="twitter:description" content='Portfolio website of Stephen Asuncion' />
            <meta property="twitter:image" content='/assets/images/meta.png' />
        </Head>
    )
}

export default Meta