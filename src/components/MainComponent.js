import React, { Component } from 'react';
import Home from './HomeComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './MenuComponent';
import DishDetailComponent from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import '../App.css';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment,fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

// <TransitionGroup>
//             <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
//               <Switch location={this.props.location}>
//                   <Route path='/home' component={HomePage} />
//                   <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
//                   <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
//                   <Route path='/menu/:dishId' component={DishWithId} />
//                   <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
//                   <Redirect to="/home" />
//               </Switch>
//             </CSSTransition>
// </TransitionGroup>

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

  
  const mapDispatchToProps = dispatch => ({
  
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
  });

  
class Main extends Component {
  
   constructor(props)
   {
      super(props);
    
  }
  componentDidMount() {
    this.props.fetchDishes();
  }
 
  render(){
      const HomePage = () =>
      {
          return(
              <Home
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leaders={this.props.leaders.filter((leader) => leader.featured)[0]}
               />
          );
      }
      const DishWithId = ({match}) => {
            return(
                <DishDetailComponent 
                dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}   
                comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
                   addComment={this.props.addComment}
                   />
            );
      }
  return (
    <div>
    <Header/>
  
     <Switch>
         <Route  path="/home" component={HomePage}/>
         <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>} />
         {/* pass props this way */}
         <Route path="/menu/:dishId" component={DishWithId}/>
         <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}/>
         <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
        <Redirect to="/home"/>
              </Switch>
      <Footer/>
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
