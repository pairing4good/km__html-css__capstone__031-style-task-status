# 030 Display Task Status

```
Given that a new task is created 
When I list the tasks 
Then I will see the task status of 'todo' is displayed to the right of the task description
```

```
Given that a task is started
When I list the tasks  
Then I will see the task status of 'doing' is displayed to the right of the task description
```

```
Given that a task is completed
When I list the tasks  
Then I will see the task status of 'done' is displayed to the right of the task description
```

Steps:
- Identify each task status with the unique id's of task-status-1 , task-status-2, task-status-3.
- Display the task description followed by the status in the same line.
- Pad the task description and status with 5px on all sides.

Resources:
- https://www.w3schools.com/css/css3_flexbox.asp
- https://www.w3schools.com/css/css_padding.asp
