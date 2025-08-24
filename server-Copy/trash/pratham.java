import java.io.*;

class square{
   
    void area(int side){
        System.out.println("the area of square is:"+side*side);
    }
    void area(float lenght,float breadth){
        System.out.println("the area of rectangle is:"+lenght*breadth);
    }
   
}
public class pratham {
    
    public static void main(String[] args) {
      square par=new square();
      par.area(5.3f,8.3f);
        
        System.out.println("hello world");
    }
}
