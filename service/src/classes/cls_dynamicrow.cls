public class cls_dynamicrow
                                                {
                                                  public List<WrapperQueAns> lstQueAns = new List<WrapperQueAns>{};
                                                  public List<WrapperQueAns> propLstQuesAns { get { return lstQueAns; } set { lstQueAns = value; } }
                                                  Public cls_dynamicrow(){
                                                                WrapperQueAns wqa = new WrapperQueAns();
                                                                wqa.propAns = '';
                                                                lstQueAns.add(wqa);
                                                  }
                                                  public void DynamicRow(){
                                                                for(Integer i=0;i<5;i++){
                                                                  WrapperQueAns wqa = new WrapperQueAns();
                                                                  wqa.propAns    = '';
                                                                  lstQueAns.add(wqa);
                                                                }
                                                  }
                                                  public class WrapperQueAns{public String propAns   { get; set; } }//End Class WrapperQueAns
                                                }