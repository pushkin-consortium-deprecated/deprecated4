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
import listenerQuiz from '../experiments/listener-quiz/index';
import Updates from '../pages/updates/index';
import Container from '../pages/containers/container';
import ResultsContainer from '../pages/containers/ResultsContainer';
// import QuizContainer from '../pages/containers/quizcontainer';

export const routes = (<Route path="/" component={Container}>
  <IndexRoute component={HomePage} />
  <Route path="/paths" component={Paths} />
  {/*
  <Route path="/quizzes" component={Quizzes}>
    <Route path="/quizzes/listener-quiz" component={listener-quiz} />
  </Route>
  This method of nesting routes is good if you want all children of a particular route to still cause the relevant menu bar tab to remain in the active css configuration when you progress to a child. I.e. /quizzes and /quizzes/listener-quiz both make the quiz tab in the menu bar display as active. Note how below I'll declare the same routes but not nest them, as I don't want the active class to be inherited.
  */}
  <Route path="/quizzes" component={Quizzes} />
  <Route path="/quizzes/listener-quiz" component={listenerQuiz} />
  <Route path="/projects" component={Projects} />
  <Route path="/archive" component={Archive} />
  <Route path="/results" component={ResultsContainer} />
  <Route path="/findings" component={Findings} />
  <Route path="/about" component={About} />
  <Route path="/updates" component={Updates} />
  <Route path="/error" component={ErrorPage} />
  <Route path="*" component={ErrorPage} />
</Route>
);
