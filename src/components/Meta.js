import Head from 'next/head'

const Meta = () => {
    return (
        <Head>
            <title>Stephen Asuncion | Portfolio Website</title>
            <meta name="title" content='Stephen Asuncion | Portfolio Website' />
            <meta name="description" content="I'm a Software Engineer, Full-Stack Web Developer, and Technopreneur. Visit my Portfolio Website if you are interested in seeing my work." />
            <meta name="keywords" content='Stephen Asuncion, Portfolio Website' />
            <meta name="robots" content='index, follow' />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content='en' />
            <meta name="theme-color" content="#348CD4" />
            
            <meta property="og:type" content='website' />
            <meta property="og:url" content='https://stephenasuncion.dev/' />
            <meta property="og:title" content='Stephen Asuncion | Portfolio Website' />
            <meta property="og:description" content="I'm a Software Engineer, Full-Stack Web Developer, and Technopreneur. Visit my Portfolio Website if you are interested in seeing my work." />
            <meta property="og:image" content='https://stephenasuncion.dev/assets/meta.png' />
            <meta property="og:site_name" content='stephenasuncion' />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content='https://stephenasuncion.dev/' />
            <meta property="twitter:title" content='Stephen Asuncion | Portfolio Website' />
            <meta property="twitter:description" content="I'm a Software Engineer, Full-Stack Web Developer, and Technopreneur. Visit my Portfolio Website if you are interested in seeing my work." />
            <meta property="twitter:image" content='https://stephenasuncion.dev/assets/meta.png' />
        </Head>
    )
}

export default Meta