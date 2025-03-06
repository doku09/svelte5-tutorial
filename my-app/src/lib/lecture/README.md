33. js프록시

프록시 개체를 사용하면 다른 객체에 대한 프록시를 생성하여 해당 객체의 기본 작업을 가로채고 재정의할 수 있음.

 ```
  const proxy = new Proxy(target, handler);
  대상 객체가 프록시하려는 객체(handler)와 가로채려는 객체(handler) 두가지를 인자로 받아 proxy를 생성함
 ```