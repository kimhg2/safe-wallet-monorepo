import React from 'react'
import { Typography } from '@mui/material'
import css from './styles.module.css'
import WelcomeLogin from './WelcomeLogin'
import BrandLogo from '@/components/common/BrandLogo'
import footerCss from './welcomeFooter.module.css'
import Footer from '../common/Footer'

const NewSafe = () => {
  return (
    <div className={css.loginPage}>
      <div className={css.leftSide}>
        <div className={css.logoContainer}>
          <BrandLogo className={css.logo} />
        </div>
        <div className={css.loginContainer}>
          <WelcomeLogin />
        </div>
        <Footer forceShow versionIcon={false} helpCenter={false} preferences={false} className={footerCss.footer} />
      </div>

      <div className={css.rightSide}>
        <div className={css.rightContent}>
          <Typography className={css.label}>PARATAXIS WALLET</Typography>
          <Typography component="h1" className={css.mainTitle}>
            Backing the future.
            <span>Powered by Ethereum.</span>
          </Typography>
          <Typography className={css.description}>
            Institutional smart account operations for teams that manage Ethereum treasuries.
          </Typography>
        </div>
        <div className={css.mockupImageContainer}>
          <img src="/images/welcome/safe-mockup.png" alt="Safe interface mockup" className={css.mockupImage} />
        </div>
      </div>
    </div>
  )
}

export default NewSafe
