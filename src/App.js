import { Route, Switch } from 'react-router-dom';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import {onError} from '@apollo/client/link/error'
import Landing from './Components/Landing';
import Contacts from './Components/Contacts';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:3001/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});





function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Switch>
        <Route exact path = '/'>
          <Landing/>
        </Route>
        <Route
          exact
          path="/contacts/:userId"
          render={({ match }) => (
            <Contacts userId={match.params.userId} />  
          )}/>                        
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
