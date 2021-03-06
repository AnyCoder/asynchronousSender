function AsynchronousGetSender(table, url){
    var self = this;
    this.table = table;
    this.iteration = 1;
    this.total = table.length;

    this.url = url;
    this.type = "json";

    this.DuringAction = function(){
      console.log("Response number: "+self.iteration);
    }

    this.FinishedAction = function(){
      console.log("Finished all!");
    }

    this.SendNext = function(){
      if(self.iteration < self.total){
        self.DuringAction();
        self.iteration++;
        self.SendData();
      }
    }

    this.IsFinished = function(){
      if(self.iteration >= self.total){
        self.FinishedAction();
      }
    }

    this.SendData = function(){
        $.ajax({
            type: "GET",
            url: self.url,
            async: "true",
            dataType: self.type,
            data:{
                data: self.table[self.iteration-1]
            },
            success:function(data){},
            complete: function(data){
                self.SendNext();
                self.IsFinished();
            }
        });
    }
}
