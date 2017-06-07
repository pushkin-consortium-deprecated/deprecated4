import { Route, IndexRoute } from 'react-router';
import React from 'react';
import About from '../pages/about/index';
import ErrorPage from '../pages/error/index';
import Findings from '../pages/findings/index';
import HomePage from '../pages/home/index';
import Paths from '../pages/paths/index';
import Projects from '../pages/projects/index';
import Quizzes from '../pages/quizzes/index';
import Archive from '../pages/archive/index';
import WhichEnglish from '../pages/whichenglish/index';
import Updates from '../pages/updates/index';
import Container from '../pages/containers/container';
import ResultsContainer from '../pages/containers/ResultsContainer';
import LastPage from '../pages/whichenglish/components/content/lastPage';
// import QuizContainer from '../pages/containers/quizcontainer';

export const routes = (<Route path="/" component={Container}>
  <IndexRoute component={HomePage} />
  <Route path="/paths" component={Paths} />
  <Route path="/quizzes" component={Quizzes}>
    <Route path="/quizzes/whichenglish" component={WhichEnglish} />
  </Route>
  <Route path="/archive" component={Archive} />
  <Route path="/results" component={ResultsContainer} />
  <Route path="/results/user/:id" component={LastPage} />
  <Route path="/projects" component={Projects} />
  <Route path="/findings" component={Findings} />
  <Route path="/about" component={About} />
  <Route path="/updates" component={Updates} />
  <Route path="/error" component={ErrorPage} />
  <Route path="*" component={ErrorPage} />
</Route>
);
