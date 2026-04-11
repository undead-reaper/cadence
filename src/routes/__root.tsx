import { ClerkProvider } from '@clerk/tanstack-react-start'
import { ui } from '@clerk/ui'
import { shadcn } from '@clerk/ui/themes'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import appCss from '@/styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Cadence',
      },
      {
        name: 'description',
        content:
          'Create lifelike AI voices with text-to-speech, voice cloning, and dubbing for videos, podcasts, apps, and multilingual content at scale.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const applyTheme = (isDark) => {
                  document.documentElement.classList.toggle('dark', isDark)
                }
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
                applyTheme(mediaQuery.matches)
                mediaQuery.addEventListener('change', (event) => applyTheme(event.matches))
              })()
            `,
          }}
        />
        <HeadContent />
      </head>
      <body>
        <ClerkProvider
          ui={ui}
          appearance={{
            theme: shadcn,
          }}
        >
          <Toaster richColors duration={2000} />
          <TooltipProvider>{children}</TooltipProvider>
        </ClerkProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            formDevtoolsPlugin(),
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
