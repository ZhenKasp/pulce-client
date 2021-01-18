import React, { useState, useEffect } from 'react';
import classes from './App.module.css';
import ReactLoading from 'react-loading';
import Filter from '../Filter/Filter';
import axios from 'axios';
import authHeader from "../../../service/auth-header";
import { useHistory, useParams } from "react-router-dom";

const App = props => {
  let { id } = useParams();
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [shownStudents, setShownStudents] = useState([]);
  const [activeGroup, setActiveGroup] = useState('all');
  const [activeCourse, setActiveCourse] = useState('all');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_PATH_TO_SERVER + "results/" + id,
      { headers: authHeader() }
    ).then(res => {
      if (res.data.error) {
        alert(res.data.error)
      } else {
        setStudents(res.data);
        setShownStudents(res.data)
        setLoading(false);
      }
    }).catch(err => {
      history.replace('/');
      console.log(err);
      setLoading(false);
    });
  }, [])

  const filterValues = (array, key) => {
    return array.map(item => item.user[key]).filter((value, index, self) => self.indexOf(value) === index)
  }

  useEffect(() => {
    setShownStudents(() => {
      return students.filter(student => (activeCourse === 'all' || student.user.course === activeCourse) &&
        (activeGroup === 'all' || student.user.speciality === activeGroup)
      )
    })
  }, [activeGroup, activeCourse])

  return (
    <div>
      {loading !== true ?
        <div className={classes.Wrapper}>
          <h1>Students</h1>
            {students.length > 0 ?
              <div>
                <div className={classes.Filters}>
                  <Filter
                    className={Filter}
                    values={filterValues(students, "course")}
                    filterName="Courses"
                    active={activeCourse}
                    setActive={setActiveCourse}
                  />
                  <Filter
                    className={Filter}
                    values={filterValues(students, "speciality")}
                    filterName="Groups"
                    active={activeGroup}
                    setActive={setActiveGroup}
                  />
                </div>
                {shownStudents.length > 0 ?
                  <div>
                    {shownStudents.map((student, index) => (
                      <div className={classes.Card} key={index}>
                        <div><b>Username: </b>{student.user.username}</div>
                        <span className={classes.SmallDistance}/>
                        <div><b>Full name: </b>{student.user.first_name + " " + student.user.last_name + " "}</div>
                        <span className={classes.SmallDistance}/>
                        <div><b>Course: </b>{student.user.course} <b>Group: </b>{student.user.speciality}</div>
                        <span className={classes.SmallDistance}/>
                        <div><b>Grade: </b>{student.grade}</div>
                      </div>
                    ))}
                  </div> : <div>There are no students for this filter</div>
                }
              </div> :
              <p>There are no students who have passed this test</p>
            }
        </div> :
        <div className={classes.Loading}>
          <ReactLoading type={"spinningBubbles"} color="#000000" />
        </div>}
    </div>
  )
};

export default App;
