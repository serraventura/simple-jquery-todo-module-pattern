var todoModule = (function ($) {

    // private methods
    var tasks = [];

    function doListOfTasks() {

        for(var i=0; i<tasks.length; i++){


            $('<li>', {
              
                name    : 'li-labelTask',
                id      : 'li-labelTask'+i
                
            }).appendTo('#ul-listOfTasks');


            // check flag DONE
            if(tasks[i].flag == 1){

                $('<input>', {
                  
                    type    : 'checkbox',
                    name    : 'chk-flagTask',
                    id      : 'chk-flagTask'+i,
                    disabled : 'disabled',
                    checked : 'checked',
                    value   : tasks[i].flag
                    
                }).appendTo('#li-labelTask'+i);

            }else{

                $('<input>', {
                  
                    type    : 'checkbox',
                    name    : 'chk-flagTask',
                    id      : 'chk-flagTask'+i,
                    disabled : 'disabled',
                    value   : tasks[i].flag
                    
                }).appendTo('#li-labelTask'+i);

            }


            $('<span>', {
              
                id     : 'spn-labelTask'+i,
                html   : ' - ' + tasks[i].title + ' - ' + tasks[i].date + ' - '
                
            }).appendTo('#li-labelTask'+i);



            $('<input>', {
              
                type    : 'button',
                name    : 'btn-editTask',
                id      : 'btn-editTask'+i,
                value   : 'Edit'
                
            }).appendTo('#li-labelTask'+i);



            $('<input>', {
              
                type    : 'button',
                name    : 'btn-delTask',
                id      : 'btn-delTask'+i,
                value   : 'Del'
                
            }).appendTo('#li-labelTask'+i);


            $('#btn-delTask'+i).data('idTask', i);
            $('#btn-delTask'+i).data('input-type', 'BDEL');

            $('#btn-editTask'+i).data('idTask', i);
            $('#btn-editTask'+i).data('input-type', 'BEDIT');

            $('#chk-flagTask'+i).data('idTask', i);
            $('#chk-flagTask'+i).data('input-type', 'CHKFLAG');

            // add property in array
            tasks[i].id = i;


        }


    }


    function clearListTasks(){
        $('#ul-listOfTasks').html('');
    }


    // public methods
    return { 

        init: function(){

          // Load events
          this.eventsTask();
          doListOfTasks();


        },

        // Add tasks
        addItem: function( values ) {

          tasks.push(values);
          clearListTasks();
          doListOfTasks();

        },


        deleteTask: function( item ) {

          tasks = $.grep(tasks, function(value) {
            return value.id != item;
          });

          clearListTasks();
          doListOfTasks();

        },


        editItem: function( idTask ){

          var titleTask = tasks[idTask].title;
          var dateTask = tasks[idTask].date;

          $('#spn-labelTask'+idTask).html('');

          $('<input>', {
              type    : 'text',
              name    : 'txt-dynamicEditTitle',
              id      : 'txt-dynamicEditTitle'+idTask,
              value   : titleTask
          }).appendTo('#spn-labelTask'+idTask);

          $('<input>', {
              type    : 'date',
              name    : 'dt-dynamicEditDate',
              id      : 'dt-dynamicEditDate'+idTask,
              value   : dateTask
          }).appendTo('#spn-labelTask'+idTask);

          $('#chk-flagTask'+idTask).removeAttr('disabled');
          $('#btn-editTask'+idTask).val('Update');
          $('#btn-editTask'+idTask).data('input-type', 'BUPT');

        },

        // update array
        updateItem: function( arrTask ){

          for(var i=0; i<tasks.length; i++){

            if(tasks[i].id == arrTask.id){

              tasks[i].title = arrTask.title;
              tasks[i].date = arrTask.date;
              tasks[i].flag = arrTask.flag;

              break;

            }

          }

          clearListTasks();
          doListOfTasks();

        },


        // Events
        eventsTask: function(){

          $( '#btnAdd' ).click(function() {

              todoModule.addItem({
                id: null,
                title: $('#descriptionTask').val(),
                date: $('#dateTask').val(),
                flag: 0
              });

          });


          $('ul').on('click', 'input', function() {

              var idTask;
              var inputType = $('#'+this.id).data('input-type');

              if (inputType == 'BDEL') {
                idTask = $('#'+this.id).data('idTask');
                todoModule.deleteTask(idTask);
              }

              if (inputType == 'BEDIT') {
                idTask = $('#'+this.id).data('idTask');
                todoModule.editItem(idTask);
              }

              if (inputType == 'BUPT') {

                idTask = $('#'+this.id).data('idTask');

                var array = {
                  id: idTask,
                  title: $('#txt-dynamicEditTitle'+idTask).val(),
                  date: $('#dt-dynamicEditDate'+idTask).val(),
                  flag: (($('#chk-flagTask'+idTask).prop('checked')) ? 1 : 0)
                }

                todoModule.updateItem(array);

              }

              if (inputType == 'CHKFLAG') {

                /*
                idTask = $('#'+this.id).data('idTask');

                var array = {
                  id: idTask,
                  title: $('#txt-dynamicEditTitle'+idTask).val(),
                  date: $('#dt-dynamicEditDate'+idTask).val(),
                  flag: (($('#chk-flagTask'+idTask).prop('checked')) ? 1 : 0)
                }

                todoModule.updateItem(array);
                */

              }


          });


        }



    };

}(jQuery));
