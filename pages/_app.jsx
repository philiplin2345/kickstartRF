import Head from "next/head";
import React from "react";
import Header from "../components/Header";
import { Container } from 'semantic-ui-react'

function MyApp({ Component, pageProps }) {
    return (
        <React.Fragment>
            <Container>
                <Head>
                    <meta name="theme-color" content="#3c1742" />
                </Head>
                <Header></Header>
                <Component {...pageProps} />
            </Container>
        </React.Fragment>
    );
}

export default MyApp;