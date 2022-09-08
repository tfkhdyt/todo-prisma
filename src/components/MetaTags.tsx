const MetaTags = () => {
  return (
    <>
      <meta name='application-name' content='To Do List' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='To Do List' />
      <meta
        name='description'
        content='Simple To Do List web app with authentication'
      />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      {/* <meta name='msapplication-config' content='/icons/browserconfig.xml' /> */}
      <meta name='msapplication-TileColor' content='#2B5797' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='theme-color' content='#ffffff' />

      <link rel='apple-touch-icon' href='/icons/to-do-list-512.png' />

      <link rel='manifest' href='/manifest.json' />

      <meta name='twitter:card' content='summary' />
      <meta
        name='twitter:url'
        content='https://tfkhdyt-todo-list.vercel.app/'
      />
      <meta name='twitter:title' content='To Do List' />
      <meta
        name='twitter:description'
        content='Simple To Do List web app with authentication'
      />
      {/* <meta
        name='twitter:image'
        content='https://tfkhdyt-todo-list.vercel.app/icons/to-do-list-192.png'
      /> */}
      <meta name='twitter:creator' content='@tfkhdyt142' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content='To Do List' />
      <meta
        property='og:description'
        content='Simple To Do List web app with authentication'
      />
      <meta property='og:site_name' content='To Do List' />
      <meta property='og:url' content='https://tfkhdyt-todo-list.vercel.app/' />
      {/* <meta
        property='og:image'
        content='https://tfkhdyt-todo-list.vercel.app//icons/apple-touch-icon.png'
      /> */}
    </>
  );
};

export default MetaTags;
