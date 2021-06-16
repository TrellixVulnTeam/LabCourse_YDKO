import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../App/Layout/LoadingComponent';
import { useStore } from '../../../App/stores/useStore';
import {Formik} from 'formik';
import { values } from 'mobx';


export default observer (function ActivityForm() {

    const {activityStore} = useStore();
    const {selectedActivity, createActivity, updateActivity, loading,loadingInitial} = activityStore;
    const {id}=useParams<{id: string}>();

    const [activity, setActivity] = useState({
       id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue:''
    });
    
    /* useEffect(() =>{
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);
 */
   /*  function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value}) 
    }
 */
    if(loadingInitial) return<LoadingComponent content='Loading activity..'/>

    return(
        <Segment clearing>
            <Formik initialValues={activity}  onSubmit={values=> console.log(values)}>
                {({values: activity , handleChange, handleSubmit}) =>(
                <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' 
                    onChange={handleChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' 
                    onChange={handleChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' 
                    onChange={handleChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' 
                    onChange={handleChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' 
                    onChange={handleChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' 
                    onChange={handleChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button  floated='right' type='button' content='Cancel' />
                </Form>
                )}

            </Formik>
            
        </Segment>
    )
})