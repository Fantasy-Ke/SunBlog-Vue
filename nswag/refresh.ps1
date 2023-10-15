Set-Location ../src/shared/service-proxies.ts


$serviceProxies = (Get-Content -Raw -Path "service-proxies.ts" )

Write-Output "test1";

$serviceProxiesOutput = $serviceProxies.Replace('import * as moment','import moment')

Set-Content -Encoding "UTF8NoBOM" -Path "service-proxies.ts" -Value $serviceProxiesOutput
