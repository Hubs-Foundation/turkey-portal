import { ReactNode } from 'react';
import Nav from '@Navigation/Nav/Nav';
import Footer from '@Navigation/Footer/Footer';
import { Inter, Space_Grotesk } from '@next/font/google';
import { cookies } from 'next/headers';

/**
  FONTS

  Fonts can now be initialized on the server instead of loading them
  through a CDN. We just need to import them here from next fonts
  and configure a CSS variable on the fonts object and apply it as a
  class to a wrapper DOM element of the app (see <main>). The CSS 
  variable can now be used in any of the SCSS files.

  For Example,
  $primary-font: var(--inter-font);
  $secondary-font: var(--space_grotesk-font);
 */

const inter = Inter({
  variable: '--inter-font',
});

const space_grotesk = Space_Grotesk({
  variable: '--space_grotesk-font',
});

type RootLayoutPropsT = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutPropsT) {
  /**
   DARK AND LIGHT THEME

   There doesn't seem to be a great way to grab the media preference from the window 
   object while on the server ( window not available..) We may have to change our 
   tacticts and have a dark / light mode toggle that adds the theme prefernce as a cookie.
   We can look at the cookie on the server and render the appriete theme from then on. 
   Below is an example of how we might do that.
   */
  const mediaMode = cookies().get('media_mode');
  console.log('cartCount', mediaMode);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Hubs - Private, virtual 3D worlds in your browser</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body>
        <main
          data-theme={mediaMode?.value}
          className={`${inter.variable} ${space_grotesk.variable}`}
        >
          <Nav />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
