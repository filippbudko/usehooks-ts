import React, { FC } from 'react'

import { styled, useMediaQuery, useTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider } from '@mui/material/styles'
import { css } from '@mui/styled-engine'
import { Theme } from '@mui/system'
import { useDarkMode } from 'usehooks-ts'

import BackToTop from '../backToTop'
import SearchModal from '../search/SearchModal'
import Footer from './footer'
import Header from './header'
import Sidebar from './sidebar'
import useSearchModal from './useSearchModal'
import useSidebar from './useSidebar'
// import Thanks from './thanks'
import useSiteMetadata from '~/hooks/useSiteMetadata'
import { drawerWidth, Themes } from '~/theme'

const Root = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}))

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',

  transition: theme.transitions.create(['padding'], {
    duration: theme.transitions.duration.enteringScreen,
  }),

  '&::before': {
    content: '""',
    display: 'block',
    ...theme.mixins.toolbar,
  },
}))

const Layout: FC = ({ children }) => {
  const { title } = useSiteMetadata()
  const [isSidebarOpen, { openSidebar, closeSidebar }] = useSidebar()
  const [isModalOpen, { openModal, closeModal }] = useSearchModal()
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Root>
      <CustomScrollbar theme={theme} />
      <Header
        siteTitle={title}
        openSidebar={openSidebar}
        openSearch={openModal}
      />

      <Sidebar open={isSidebarOpen} onClose={closeSidebar} />

      <Main
        sx={{ paddingLeft: isLarge && isSidebarOpen ? `${drawerWidth}px` : 0 }}
      >
        {/* <Thanks /> */}
        {children}
        <Footer />
      </Main>

      <SearchModal open={isModalOpen} onClose={closeModal} />

      <BackToTop />
    </Root>
  )
}

const TopLayout: FC<{ themes: Themes }> = ({ children, themes }) => {
  const { isDarkMode } = useDarkMode(true)
  const theme = themes[isDarkMode ? 'dark' : 'light']
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>{children}</Layout>
    </ThemeProvider>
  )
}

export default TopLayout

const CustomScrollbar = ({ theme }: { theme: Theme }) => (
  <GlobalStyles
    styles={css`
      *::-webkit-scrollbar {
        width: ${theme.spacing(1.5)};
        border-radius: ${theme.shape.borderRadius}px;
      }
      *::-webkit-scrollbar-track {
        background: ${theme.palette.background.default};
      }

      *::-webkit-scrollbar-thumb {
        background: ${theme.palette.divider};
        border-radius: ${theme.shape.borderRadius}px;

        border: 3px solid ${theme.palette.background.default};
      }

      *::-webkit-scrollbar-thumb:hover {
        background: ${theme.palette.divider};
      }
    `}
  />
)
