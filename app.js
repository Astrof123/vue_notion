export default {
    data() {
        let localtasks;

        if (localStorage.getItem("tasks")) {
            localtasks = JSON.parse(localStorage.getItem("tasks"));            
        }
        else {
            localStorage.setItem('tasks', "");
            localtasks = "";
        }

        // localStorage.clear();

        return {
            count: 5,
            task_text: "",
            task_date: this.getCurrentDateYYYYMMDD(),
            tasks: localtasks,
            current_filter: "all",
            editing: false,
            current_edit_id: -1
        }
    },
    methods: {
        getCurrentDateYYYYMMDD() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
          
            return `${year}-${month}-${day}`;
        },
        favoriteClick(task_id) {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].id === task_id) {
                    this.tasks[i].favorite = !this.tasks[i].favorite;
                    localStorage.setItem("tasks", JSON.stringify(this.tasks));
                    return;
                }
            }
        },
        addNewTask() {
            if (this.editing) {
                for (let i = 0; i < this.tasks.length; i++) {
                    if (this.tasks[i].id === this.current_edit_id) {
                        this.tasks[i].text = this.task_text;
                        this.tasks[i].date = this.task_date;
                        
                        this.task_text = "";
                        this.task_date = this.getCurrentDateYYYYMMDD();
                        localStorage.setItem("tasks", JSON.stringify(this.tasks));

                        this.editing = false;
                        this.current_edit_id = -1;

                        return;
                    }
                }
            }


            let currentTaskId = localStorage.getItem("current_task_id");
            
            if (currentTaskId) {
                currentTaskId = Number(currentTaskId) + 1;
                localStorage.setItem("current_task_id", currentTaskId);
            }
            else {
                currentTaskId = 0;
                localStorage.setItem("current_task_id", 0);
            }

            let task = {
                id: currentTaskId,
                text: this.task_text,
                date: this.task_date,
                favorite: false,
                done: false
            }

            if (localStorage.getItem("tasks") !== undefined) {
                let localtasks;
                if (localStorage.getItem("tasks") === "") {
                    localtasks = [];   
                }
                else {
                    localtasks = JSON.parse(localStorage.getItem("tasks"));  
                }
                 
                localtasks.push(task);
                localStorage.setItem("tasks", JSON.stringify(localtasks));
                
                this.tasks = JSON.parse(localStorage.getItem("tasks"));
                this.task_text = "";
                this.task_date = this.getCurrentDateYYYYMMDD();
            }
            else {
                localStorage.setItem('tasks', "");
            }
        },
        filterTaskList(item) {
            return (
                this.current_filter === "all" || 
                (this.current_filter === "favorite" && item.favorite) ||
                (this.current_filter === "today" && item.date == this.getCurrentDateYYYYMMDD())
            );
        },
        menuFavoriteClick() {
            this.current_filter = "favorite";
        },
        menuTodayClick() {
            this.current_filter = "today";
        },
        menuAllClick() {
            this.current_filter = "all";
        },
        deleteItemClick(task_id) {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].id === task_id) {
                    this.tasks.splice(i, 1);
                    localStorage.setItem("tasks", JSON.stringify(this.tasks));
                    return;
                }
            }
        },
        doneStateClick(task_id) {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].id === task_id) {
                    this.tasks[i].done = !this.tasks[i].done;
                    localStorage.setItem("tasks", JSON.stringify(this.tasks));
                    return;
                }
            }
        },
        editClick(task_id) {
            this.editing = true;
            this.current_edit_id = task_id;

            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].id === task_id) {
                    this.task_text = this.tasks[i].text;
                    this.task_date = this.tasks[i].date;
                    return;
                }
            }
        }
    },
}