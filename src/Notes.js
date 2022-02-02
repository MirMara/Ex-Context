import React, { useContext } from 'react';
import { ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import Note from './Note';
import { TodosContext } from './Context/store';
import { v4 as uuidv4 } from 'uuid';

export default () => {
    const {
        state: { todos },
        addTodos,
    } = useContext(TodosContext);

    const onType = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            addTodos({
                text: e.target.value,
                id: uuidv4(),
                done: false,
            });
            e.target.value = '';
        }
    };
    return (
        <div>
             <h2>All tasks</h2>
            <ListGroup as='ol' numbered>
                {todos.map((todo) =>
                    (<Note key={todo.id} id={todo.id} note={todo} />))}
            </ListGroup>

            <h3>Uncompleted tasks</h3>
            <ListGroup as="ol" numbered>
                {todos.filter((todo) =>
                    (todo.done === false))
                    .map((todo) =>
                        (<Note key={todo.id} note={todo} />))}
            </ListGroup>

            <h3>Completed tasks</h3>
            <ListGroup as="ol" numbered>
                {todos.filter((todo) =>
                    (todo.done === true))
                    .map((todo) =>
                        (<Note key={todo.id} note={todo} />))}
            </ListGroup>

            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Insert Note</InputGroup.Text>
                <FormControl
                    onKeyDown={onType}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                />
            </InputGroup>
        </div>
    );
};
