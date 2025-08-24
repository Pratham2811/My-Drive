import java.io.*;
class area{
    double width,height,depth;
     void square(double w,double h,double d){
        width=w;
        height=h;
        depth=d;

    }
    //calculating volume of the cube
      area(double w,double h,double d){
        System.out.println("Volume of cube is : "+w*h*d);
    }

     area (double side ){
        System.out.println("Area of Square is:"+side*side);

    }
     area(float length,float bredth){
        System.out.println("Area of rectangel is :"+length*bredth);
    }
    
  
    
}







public class practical {
    public static void main(String[] args) {
       area obj=new area(5);

       
    }
    
};












