import { Route, Switch } from 'react-router-dom';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import {onError} from '@apollo/client/link/error'
import Landing from './Components/Landing';
import Contacts from './Components/Contacts';
import ContactForm from './Components/ContactForm';
import NoMatch from './Components/NoMatch';
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
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
          <Route
            exact
            path="/contact/:userId/newcontact"
            render={({ match }) => (
              <ContactForm  userId={match.params.userId} />  
            )}/>               
          <Route
            exact
            path="/contact/:userId/:contactId"
            render={({ match }) => (
              <ContactForm contactId={match.params.contactId} userId={match.params.userId} />  
            )}/>
          <NoMatch />                                    
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
