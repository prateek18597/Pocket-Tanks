t = int(input())

def dis(con,amodb,b):
    if con == amodb:
        return 0
    elif con>amodb:
        return(con-amodb)
    else:
        return (b - amodb)+con

answers = []

for i in range(0,t):
    n = int(input())
    A = list(map(lambda x:int(x),input().split(" ")))
    B = list(map(lambda x:int(x),input().split(" ")))
    AmodB = []
    for i in range(0,n):
        AmodB.append(A[i]%B[i])
    constraint=min(B)
    # print(constraint)
    ans = 1000000000
    
    for con in range(0,constraint):
        temp = 0
        for i in range(0,n):
            temp += dis(con,AmodB[i],B[i])
            if temp>ans:
                break
        if temp < ans:
            ans = temp
    answers.append(ans)

for i in answers:
    print(i)
        
