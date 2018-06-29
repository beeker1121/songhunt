import { combineReducers } from 'redux';

// App imports.
import days from './days';
import songs from './songs';

// Redux state layout:
//
// {
//   days: {
//     byId: {
//       0: {
//         songs: [1, 2]
//       }
//     },
//     allIds: [0]
//   },
//
//   songs: {
//     byId: {
//       1: {
//         id: 1,
//         title: "Hours",
//         artist: "Billboard",
//         ...
//         comments: [1, 2],
//         upvotes: 123
//       }
//     },
//     allIds: [1]
//   },
//
//   comments: {
//     byId: {
//       1: {
//         id: 1,
//         parentId: null,
//         comment: "Comment text here",
//         upvotes: 12
//       }
//     },
//     allIds: [1]
//   }
// }
//
// Component structure:
//
// in main route:
// <Day id=0 />
//
// in <Day> component:
// <Song id=1 />
// <Song id=2 />
// ...
//
// mapStateToProps = (state, ownProps) => {
//   return {
//     day: state.days.byId[ownProps.id]
//   }
// }
//
// in <Song> component:
// <Comment id=1 />
// <Comment id=2 />
// ...
//
// mapStateToProps = (state, ownProps) => {
//   return {
//     song: state.songs.byId[ownProps.id]
//   }
// }
//
// On componentDidMount in the main <Days> component, we can
// have it get the current day's data and set it, which will
// cause the loop of <Day> components to render the first day.
//
// The mapStateToProps function for the <Day> component will
// handle getting the data needed for the given day from the
// state, using the day's id. This will return in the form
// of { day: { day_data_here }}, which will be attached as a
// property to the <Day> component.
//
// This will contain the songs array, which is the id of each
// song for the given day. This will then be used to loop
// through and place a <Song> component, with its id property
// set to its id in the songs state.
//
// The process continues as before, and the <Song> component
// will use the mapStateToProps function to map the song data
// do its props, which will contain the comments array. The
// process will continue again on the comments.
//
// ------- OR -------
//
// Could pass the data directly to each component, i.e. the
// <Day> component would receive a 'day' prop, that contains
// all of the songs for the given day.
//
// This seems like it would get confusing, as it would be
// unclear and up to developer discretion. For instance,
// should the 'day' prop have all of the data for each song
// within its 'songs' array, or should it just keep the ids?
// If we just keep the ids, do we then render in
// mapStateToProps of the song? No, it would need the data
// directly so we can do <Song title="" artist="" ... />.
// Then where do we decide to pull in the comments? Should
// the comments already be loaded, within the songs array
// of the day prop? There's too many questions, when just
// having the id passed to each main component, which can
// then use mapStateToProps to map the props it needs from
// the normalized state, seems much easier. Then, for a
// comment for instance, it can pretty much just be a
// functional component.
export default combineReducers({
	days: days,
	songs: songs
});