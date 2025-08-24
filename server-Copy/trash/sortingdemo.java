
class sortingdemo{
    public static void main(String[] args) {
        int i,j,temp;
        int arr[]={4,3,2,1,5,7,8,9,};
        for( i=0;i<arr.length;i++){
            for( j=i+1;j<arr.length;j++){

                if(arr[j]<arr[i]){
                     
                        temp=arr[i];
                     arr[i]=arr[j];
                        arr[j]=temp;
                        
                }
            }
        }
        for( i=0;i<arr.length;i++){
            System.out.println(arr[i] );
        }
       
        
}
}