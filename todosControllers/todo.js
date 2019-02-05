/* eslint-disable class-methods-use-this */

import db from '../db/db';
import models from '../models';

class TodosController {

    getAllTodos(req, res) {

        models.Todo.findAll()
        .then(todos => res.status(200).send({
            success: 'true',
            message: 'todos retrieved successfully',
            todos: todos
        }));
    };
    
    createTodo(req, res){
        if (!req.body.title) {
            return res.status(400).send({
                success: 'false',
                message: 'title is required'
            });
        } else if (!req.body.description) {
            return res.status(400).send({
                success: 'false',
                message: 'description is required'
            });
        }
    
        const todo = {
            title: req.body.title,
            description: req.body.description
        }
    
        models.Todo.create(todo).then((todo) => {
            return res.status(201).send({
                success: 'true',
                message: 'todo added successfully',
                todo
            })
        });
    
    };
    
    getTodo(req, res) {
        const id = parseInt(req.params.id, 10);
    
        models.Todo.findByPk(id)
        .then((todo) => {
            if (todo) {
                return res.status(200).send({
                    success: 'true',
                    message: 'todo received successfully',
                    todo,
                });
            }

            return res.status(404).send({
                success: 'false',
                message: 'todo does not exist',
            });
        });

    };
    
    deleteTodo(req, res) {
        const id = parseInt(req.params.id, 10);

        models.Todo.destroy({
            where: {id: id}
        })
        .then((deletedTodo) => {
            if (deletedTodo) {
                return res.status(200).send({
                    success: 'true',
                    message: 'Todo deleted successfully',
                });
            }

            return res.status(400).send({
                success: 'false',
                message: 'todo not found'
            });
        });
    
    };
    
    updateTodo(req, res) {
        const id = parseInt(req.params.id, 10);
    
        if (!req.body.title) {
            return res.status(400).send({
                success: 'false',
                message: 'title is required'
            });
        } else if (!req.body.description) {
            return res.status(400).send({
                success: 'false',
                message: 'description is required'
            });
        }
    
        const updatedTodo = {
            title: req.body.title,
            description: req.body.description
        };

        models.Todo.findByPk(id)
        .then((todo) => {
            if (todo) {
                todo.updateAttributes(updatedTodo, {
                    updatedTodo
                }).then(() => {
                    return res.status(201).send({
                        success: 'true',
                        message: 'todo added successfully',
                        todo
                    });
                });
            } 
            
            return res.status(400).send({
                success: 'false',
                message: 'todo not found'
            });
        });
    };
}

const todoController = new TodosController();
export default todoController;