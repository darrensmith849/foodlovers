import { ScrollViewStyleReset } from 'expo-router/html'

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: appStyles }} />
      </head>
      <body>{children}</body>
    </html>
  )
}

const appStyles = `
  body {
    background-color: #080A0D;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #root {
    width: 100%;
    max-width: 430px;
    min-height: 100vh;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    background-color: #0F1115;
    box-shadow: 0 0 80px rgba(0, 0, 0, 0.3);
  }
`
