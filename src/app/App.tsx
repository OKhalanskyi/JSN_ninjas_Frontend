import Router from '@/app/providers/Router/Router.tsx';
import { useTheme } from '@/app/providers/Theme/useTheme.ts';
import classNames from 'classnames';
import Header from '@/components/Header/Header.tsx';

function App() {
  const { theme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Header />
      <Router />
    </div>
  )
}

export default App
